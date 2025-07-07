"use client";
import logo from "@/public/heritage.svg";
import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Location } from "@/app/(landing)/_components/types/location";
import Image from "next/image";

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
        const response = await fetch("/api/proxy");

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

  if (isLoading)
    return (
      <div className="flex w-screen h-screen flex-col justify-center items-center">
        <Image src={logo} alt="heritage" height={100} />
        <div className="flex space-x-2 mt-5">
          <div className="w-3 h-3 bg-black/40 rounded-full animate-[bounce_1.4s_infinite_ease-in-out]"></div>
          <div className="w-3 h-3 bg-black/50 rounded-full animate-[bounce_1.4s_infinite_ease-in-out] [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-black/60 rounded-full animate-[bounce_1.4s_infinite_ease-in-out] [animation-delay:0.4s]"></div>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="flex w-screen h-screen flex-col justify-center items-center">
        <Image src={logo} alt="heritage" height={100} />
        <div className="flex space-x-2 mt-5">Error Fetching Data</div>
      </div>
    );
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
