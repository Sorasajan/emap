"use client";

import Link from "next/link";
import { GiElectricalSocket } from "react-icons/gi";
import { useData } from "../context/datacontext";
import { Location } from "@/app/(landing)/_components/types/location";
import { PiSlideshowFill } from "react-icons/pi";
import { useEffect, useMemo, useState } from "react";
import { FaGripLinesVertical } from "react-icons/fa";

export default function LocationBox() {
  const { data, setSelectedMarker, setSearchLocation, searchLocation } =
    useData();

  const [sidebar, setSidebar] = useState(true);

  // Immediately update search location on keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setSearchLocation(e.currentTarget.value);
  };

  useEffect(() => {
    // If debounced search changes, perform filtering
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const handleResize = (e: MediaQueryListEvent) => {
      setSidebar(e.matches);
    };

    // Set initial state
    setSidebar(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Filtered locations
  const filteredLocations = useMemo(() => {
    if (!data) return [];
    if (searchLocation.trim() === "") return data;

    return data.filter((location) => {
      const locationName = location["Name of the location"].toLowerCase();
      const address =
        `${location.address.street1} ${location.address.street2} ${location.address.city} ${location.address.state}`.toLowerCase();
      const chargerName = location["Name of the charger"].toLowerCase();

      return (
        locationName.includes(searchLocation.toLowerCase()) ||
        address.includes(searchLocation.toLowerCase()) ||
        chargerName.includes(searchLocation.toLowerCase())
      );
    });
  }, [data, searchLocation]);

  const handleSelectLocation = (location: Location) => {
    setSelectedMarker(location);
  };

  return (
    <div className={sidebar ? "w-100" : "w-0 overflow-hidden"}>
      <div
        className={`right-0 p-5 z-1 flex gap-5 items-center ${
          sidebar
            ? "sticky top-0 bg-white"
            : "absolute bottom-1/2 translate-y-1/2 right-0 rounded-l-full h-50 bg-black text-white"
        }`}
      >
        {sidebar ? (
          <input
            className="w-full border border-black rounded-lg p-2 bg-white flex-1"
            placeholder="Search Location"
            autoComplete="off"
            onKeyDown={handleKeyDown} // Change to onKeyDown for immediate search
          />
        ) : null}

        {sidebar ? (
          <FaGripLinesVertical
            className="text-2xl cursor-pointer"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <PiSlideshowFill
            className="text-3xl cursor-pointer"
            onClick={() => setSidebar(true)}
          />
        )}
      </div>

      <div
        className={`p-5 text-sm overflow-x-auto lg:flex-col gap-5 ${
          sidebar ? "flex" : "hidden"
        }`}
      >
        {filteredLocations.map((item, i) => {
          const plugs = item?.["Plugs details"] || [];

          return (
            <div
              key={item.locationId || i}
              className="bg-white w-full p-5 leading-6 flex-shrink-0 hover:scale-95 hover:bg-green-50 transition-all duration-500 cursor-pointer"
              onClick={() => handleSelectLocation(item)}
            >
              <p className="text-lg font-semibold">
                {item["Name of the location"]}
              </p>
              <p className="italic text-gray-400">
                {item.address.street1}
                {item.address.street2 ? `, ${item.address.street2}` : ""}
              </p>
              <p className="mt-5">
                {item["Contact No"] || "No contact number available"}
              </p>
              <p className="mt-5">
                {item.address.city}, {item.address.state}
              </p>
              <p className="font-semibold mt-5 pb-2">
                {item["Name of the charger"]} Charger
              </p>

              {plugs.map((plug: any, i: number) => (
                <p
                  key={i}
                  className={`flex items-center text-xs justify-between mt-2 ${
                    plug.connectorStatus === "Available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <span className="flex gap-2 items-center">
                    <GiElectricalSocket className="rounded-full text-xl" />
                    <span className="font-bold">
                      {plug.physicalReference} ({plug.maxOutputPower} KW)
                    </span>
                  </span>
                  <span>
                    Charging Plug{" "}
                    {plug.connectorStatus === "Available"
                      ? "Available"
                      : "Not Available"}
                  </span>
                </p>
              ))}

              <div className="grid grid-cols-2 gap-5 mt-5">
                <Link
                  href={`/${item._id}`}
                  className="p-2 px-5 border border-black text-center hover:scale-[.95] transition-all duration-500"
                >
                  Get Details
                </Link>
                <div className="p-2 px-5 border border-black text-center bg-black text-white hover:scale-[.95] transition-all duration-500">
                  Get Direction
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
