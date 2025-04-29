"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import useSWR from "swr";

// Type definitions for the data structure
interface Location {
  id: string;
  name: string;
}

interface ApiData {
  message: string;
  data: {
    locations: Location[];
  };
}

interface DataContextType {
  data: ApiData | null;
  isLoading: boolean;
  isError: boolean;
  selectedMarker: Location | null;
  setSelectedMarker: (marker: Location | null) => void; // Add setter for selectedMarker
}

interface DataProviderProps {
  children: ReactNode;
}

// Environment variables
const url = process.env.NEXT_PUBLIC_API_URL;
const auth_token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

// Check if environment variables are available
if (!url || !auth_token) {
  throw new Error(
    "API_URL or AUTH_TOKEN is not defined in environment variables"
  );
}

// Fetcher function to fetch data from API
const fetcher = async (url: string): Promise<ApiData> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `${auth_token}`,
      },
    });

    // Check if the fetch request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the response as JSON
    const data: ApiData = await response.json();

    // Check if the expected data structure is present
    if (!data || !data.message || !Array.isArray(data.data?.locations)) {
      throw new Error(
        "Invalid data structure: message or locations are missing"
      );
    }

    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Error fetching data: ${message}`);
  }
};

// Context to hold data state
const DataContext = createContext<DataContextType | undefined>(undefined);

// DataProvider component to fetch data and provide it via context
export const DataProvider = ({ children }: DataProviderProps) => {
  const { data, error, isLoading } = useSWR<ApiData>(url, fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
    revalidateOnFocus: false, // Disable revalidation on focus
    shouldRetryOnError: false, // Don't retry failed requests automatically
  });

  const [errorState, setErrorState] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null); // State for selected marker

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue: DataContextType = useMemo(() => {
    return {
      data,
      isLoading,
      isError: !!error || !!errorState,
      selectedMarker, // Provide selectedMarker to the context
      setSelectedMarker, // Provide setter to update selectedMarker
    };
  }, [data, isLoading, error, errorState, selectedMarker]);

  useEffect(() => {
    // Store error state to avoid triggering re-renders on repeated errors
    if (error instanceof Error) {
      setErrorState(error.message);
    }
  }, [error]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  // Handle error state
  if (errorState) {
    return <div>Error fetching data: {errorState}</div>; // Show error message if the fetch fails
  }

  // Handle no data available case
  if (!data) {
    return <div>No data available</div>; // Show this message if the data is empty or invalid
  }

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

// Custom hook to access data from the context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used inside a DataProvider");
  }

  return context;
};
