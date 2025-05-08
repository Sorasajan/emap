"use client";

import location from "@/public/image/location.jpg";
import { useParams } from "next/navigation";
import { useData } from "../../_components/context/datacontext";
import Link from "next/link";
import Image from "next/image";
import { IoHome } from "react-icons/io5";

export default function Chargers() {
  const params = useParams();
  const rawState = params.state as string;
  const state = decodeURIComponent(rawState);

  const { data, isLoading, isError } = useData();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading data</div>;

  const locationsInState = data
    .filter((data) => data.address.state.toLowerCase() === state.toLowerCase())
    .sort();

  return (
    <div>
      <div className="relative h-100 overflow-hidden">
        <Image
          src={location}
          alt="location"
          className="bottom-1/2 absolute translate-y-1/2 blur"
        />
        <div className="w-full h-full bg-black/50 absolute top-0 left-0 flex p-5 justify-center flex-col">
          <div className="flex-1 flex items-center justify-center text-white text-2xl">
            <IoHome /> &nbsp; / Chargers / {state}
          </div>
          <h1 className="font-light text-center text-lg text-white">
            Chargers in {state}
          </h1>
        </div>
      </div>
      <div className="max-w-[1366px] mx-auto p-5">
        {locationsInState.length === 0 ? (
          <p>No chargers found in this state.</p>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {locationsInState.map((location, i) => (
              <li key={i} className="relative group">
                <Link
                  href={`/${location._id}`}
                  className="bg-gray-100 block px-5 py-5 pt-10 hover:scale-95 transition-all duration-500 hover:bg-gray-200 "
                >
                  <p className="font-semibold">
                    {location["Name of the location"]} -{" "}
                    {location["Name of the charger"]}
                  </p>
                  {location.address.street1}, {location.address.street1} <br />
                  {location.address.city}
                </Link>
                <div
                  className={`px-5 py-1 absolute top-0 group-hover:scale-95 text-center transition-all duration-500 rounded-b-lg right-2 w-40 text-white ${
                    location.available ? "bg-blue-500" : "bg-red-500"
                  }`}
                >
                  {location.available ? "Available" : "Not Available"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
