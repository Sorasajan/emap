"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Location } from "@/app/(landing)/_components/types/location";

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

const url = process.env.NEXT_PUBLIC_API_URL!;
const auth_token = process.env.NEXT_PUBLIC_AUTH_TOKEN!;

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<Location[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [searchLocation, setSearchLocation] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `${auth_token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();

        // Accept either { data: Location[] } or plain Location[]
        const locations = Array.isArray(result) ? result : result.data;

        if (!Array.isArray(locations)) {
          throw new Error(
            "Invalid data structure: expected array of locations"
          );
        }

        const sorted = locations.sort((a, b) =>
          a["Name of the location"].localeCompare(b["Name of the location"])
        );

        setData(sorted);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue: DataContextType = useMemo(
    () => ({
      data,
      isLoading,
      isError,
      selectedMarker,
      searchLocation,
      setSearchLocation,
      setSelectedMarker,
    }),
    [data, isLoading, isError, selectedMarker, searchLocation]
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  if (!data) return <div>No data available</div>;

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used inside a DataProvider");
  }
  return context;
};
