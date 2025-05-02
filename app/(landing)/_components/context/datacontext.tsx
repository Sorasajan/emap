"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import useSWR from "swr";
import { Location } from "@/app/(landing)/_components/types/location";

interface ApiData {
  message: string;
  data: Location[];
}

interface DataContextType {
  data: Location[] | null;
  isLoading: boolean;
  isError: boolean;
  selectedMarker: Location | null;
  searchLocation: string;
  setSearchLocation: (value: string) => void;
  setSelectedMarker: (marker: Location | null) => void;
}

interface DataProviderProps {
  children: ReactNode;
}

const fetcher = async (url: string): Promise<ApiData> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `${auth_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: ApiData = await response.json();

    // Validate the data structure
    if (!data || !Array.isArray(data)) {
      throw new Error(
        "Invalid data structure: 'data.locations' is missing or not an array"
      );
    }

    // Sort locations by 'Name of the location'
    data.sort((a, b) =>
      a["Name of the location"].localeCompare(b["Name of the location"])
    );

    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Error fetching data: ${message}`);
  }
};

// Environment variables
const url = process.env.NEXT_PUBLIC_API_URL;
const auth_token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider
export const DataProvider = ({ children }: DataProviderProps) => {
  const { data, error, isLoading } = useSWR<ApiData>(url, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [searchLocation, setSearchLocation] = useState<string>("");

  const contextValue: DataContextType = useMemo(
    () => ({
      data: data ?? null,
      isLoading,
      isError: !!error,
      selectedMarker,
      searchLocation,
      setSearchLocation,
      setSelectedMarker,
    }),
    [data, isLoading, error, selectedMarker]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

// Custom hook
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside a DataProvider");
  }
  return context;
};
