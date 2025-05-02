"use client";

import { useParams } from "next/navigation";
import { useData } from "../_components/context/datacontext";
import details from "@/public/details.jpg";
import Image from "next/image";
import { FaParking, FaRestroom, FaToilet, FaWifi } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import {
  MdLocalCarWash,
  MdLocalGasStation,
  MdLocalHotel,
} from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";

export default function Locations() {
  const params = useParams();

  const id = params.location;

  const { data } = useData();

  const location = data?.find((item) => item._id === id);
  console.log(location);

  // Check if location is not found
  if (!location) {
    return (
      <div className="text-center mt-20">
        <h2>Location not found</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="relative w-full h-160 flex justify-center items-end">
        <Image src={details} alt="details" fill className="object-cover -z-1" />
        <div className="bg-black/50 text-white h-full flex flex-col items-center justify-between p-5 py-15 text-3xl font-bold px-10 w-full leading-18">
          <FaMapLocationDot className="h-40 w-40" />
          <div className="text-center ">
            {location["Name of the location"]}
            <p className="text-base font-light">
              {location.address.street1}, {location.address.street2}
            </p>
            <p className="text-xs font-light">
              15KM Away from your current location.
            </p>
          </div>

          <div className="flex gap-5 mt-30 pb-10">
            <FaWifi />
            <FaParking />
            <FaRestroom />
            <GrRestaurant />
            <MdLocalCarWash />
            <MdLocalHotel />
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-[1366px] mx-auto p-5 flex flex-col gap-10">
        <div className="relative w-fit min-w-50 border border-black rounded-lg p-5 pt-10 mx-auto text-center">
          <div className="absolute px-2 bg-white -top-4 left-1/2 -translate-x-1/2 text-xl font-semibold">
            Amenities
          </div>
          Details for Amenities not found
        </div>
        <div className="relative w-fit min-w-50 border border-black rounded-lg p-5 pt-10 mx-auto text-center">
          <div className="absolute px-2 bg-white -top-4 left-1/2 -translate-x-1/2 text-xl font-semibold">
            Plugs
          </div>
          Details for Amenities not found
        </div>
        <div className="relative w-fit min-w-50 border border-black rounded-lg p-5 pt-10 mx-auto text-center">
          <div className="absolute px-2 bg-white -top-4 left-1/2 -translate-x-1/2 text-xl font-semibold">
            Location
          </div>
          Details for Amenities not found
        </div>
      </div>
    </div>
  );
}
