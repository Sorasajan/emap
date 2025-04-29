"use client";
import Link from "next/link";
import { GiElectricalSocket } from "react-icons/gi";
import { useData } from "../context/datacontext";

export default function LocationBox() {
  const data = useData();
  const locations = data?.data?.data?.locations;
  const { selectedMarker, setSelectedMarker } = useData(); // Get the selectedMarker and setSelectedMarker from context

  const handleSelectLocation = (location) => {
    // Set the selected marker when a location is clicked
    setSelectedMarker(location);
    console.log(selectedMarker);
  };
  return (
    <div>
      <div className="sticky top-0 bg-white right-0 p-5 z-1">
        <input
          className="w-full border border-black rounded-lg p-2 bg-white "
          placeholder="Search Location"
        />
      </div>
      <div className="p-5 text-sm flex overflow-x-auto md:flex-col gap-5">
        {locations.map((item, i) => (
          <div
            key={i}
            className="bg-white w-full p-5 leading-6 flex-shrink-0 hover:scale-95 hover:bg-green-50 transition-all duration-500 cursor-pointer"
            onClick={() => handleSelectLocation(item)} // Set selected location on click
          >
            <p className="text-lg font-semibold">{item.name}</p>
            <p className="font-italic text-gray-400">
              {item.street1}, {item.street2}
            </p>
            <p className="mt-5">
              {item.city}, {item.state}
            </p>
            <p className="font-semibold mt-5 pb-2">Chargers </p>
            <p
              className={`flex items-center text-xs justify-between ${
                item.available ? "text-green-500" : "text-red-500"
              }`}
            >
              <span className="flex gap-2 items-center">
                <GiElectricalSocket className="rounded-full text-xl" />
                <span className="font-bold">{item.stationType}</span>
              </span>
              <span>
                Charging Plug {item.available ? "Available" : "Not Available"}
              </span>
            </p>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <Link
                href={`/${item.locationId}`}
                className="p-2 px-5 border border-black text-center hover:scale-[.95] transition-all duration-500"
              >
                Get Details
              </Link>
              <div className="p-2 px-5 border border-black text-center bg-black text-white hover:scale-[.95] transistion-all duration-500">
                Get Direction
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
