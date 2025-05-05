"use client";

import { useParams } from "next/navigation";
import { useData } from "../_components/context/datacontext";
import details from "@/public/details.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaParking, FaRestroom, FaToilet, FaWifi } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import {
  MdLocalCarWash,
  MdLocalGasStation,
  MdLocalHotel,
} from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiChargingPile2Fill } from "react-icons/ri";

function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Locations() {
  const params = useParams();
  const id = Array.isArray(params.location)
    ? params.location[0]
    : params.location;

  const { data } = useData();
  const location = data?.find((item) => item._id === id);
  console.log(data);

  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (location?.["Maps details"]?.coordinates) {
      const [lat2, lon2] = location["Maps details"].coordinates;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat1 = pos.coords.latitude;
          const lon1 = pos.coords.longitude;
          const dist = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
          setDistance(dist);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, [location]);

  if (!location) {
    return (
      <div className="text-center mt-20">
        <h2>Location not found</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full h-[40rem] flex justify-center items-end">
        <Image src={details} alt="details" fill className="object-cover -z-1" />
        <div className="bg-black/50 text-white h-full flex flex-col items-center justify-between p-5 py-15 text-3xl font-bold px-10 w-full leading-18">
          <FaMapLocationDot className="h-40 w-40" />
          <div className="text-center ">
            {location["Name of the location"]}
            <p className="text-base font-light">
              {location.address.street1}, {location.address.street2}
            </p>
            <p className="text-xs font-light">
              {distance
                ? `Approx. ${distance.toFixed(
                    2
                  )} KM Away from your current location.`
                : "Distance unavailable"}
            </p>
          </div>

          <div className="flex gap-5 mt-8 pb-10">
            <FaWifi />
            <FaParking />
            <FaRestroom />
            <GrRestaurant />
            <MdLocalCarWash />
            <MdLocalHotel />
          </div>
        </div>
      </div>

      <div
        className="mt-10 max-w-[1366px] mx-auto p-5 grid md:grid-cols-3 
       gap-10"
      >
        <div className="col-span-2 flex flex-col gap-5 ">
          <div className="w-full bg-gray-100 rounded-lg flex-1 p-5 pt-10 mx-auto text-center">
            <div className="px-2 text-xl font-semibold">Amenities</div>
            {location.amenities && location.amenities.length > 0 ? (
              <ul className="list-disc list-inside text-left">
                {location.amenities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No amenities details provided.</p>
            )}
          </div>
          <div className="bg-gray-100 w-full rounded-lg gap-5 justify-center p-5 pt-10 mx-auto  flex items-center">
            <FaMapLocationDot className="text-6xl" />
            <div>
              {location.address.street1}, {location.address.street2} <br />
              {location.address.city} <br />
              {location.address.state}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full rounded-lg p-5 pt-10 mx-auto text-center pb-10 ">
          <p className="font-semibold mt-2">
            {location["Name of the charger"]}
          </p>
          <div className="mt-5 flex flex-col gap-5 justify-center">
            {location["Plugs details"].map((item, i) => (
              <div key={i} className="flex bg-white p-5 shadow rounded-lg">
                <RiChargingPile2Fill className="text-6xl" />

                <div className="text-left font-semibold ml-5">
                  {item.physicalReference} <br />
                  Max Output Power {item.maxOutputPower} KW <br />
                  Charger Status : {item.connectorStatus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
