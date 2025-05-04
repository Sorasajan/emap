"use client";

import { useParams } from "next/navigation";
import { useData } from "../../_components/context/datacontext";
import Link from "next/link";

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
    <div className="max-w-[1366px] mx-auto p-5">
      <h1 className="font-semibold text-center text-xl">Chargers in {state}</h1>
      {locationsInState.length === 0 ? (
        <p>No chargers found in this state.</p>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          {locationsInState.map((location, i) => (
            <li key={i} className="relative group">
              <Link
                href={`/${location._id}`}
                className="bg-gray-100 block px-5 py-5 pt-10 hover:scale-95 transition-all duration-500 hover:bg-black hover:text-white"
              >
                {location["Name of the location"]} -{" "}
                {location["Name of the charger"]}
              </Link>
              <div
                className={`px-5 pt-2 absolute top-0 group-hover:scale-95 transition-all duration-500 rounded-b-lg right-2 w-40 text-white ${
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
  );
}
