"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { renderToStaticMarkup } from "react-dom/server";
import { RiChargingPile2Fill, RiWaterFlashFill } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { useData } from "../context/datacontext";

import { Location } from "@/app/(landing)/_components/types/location";
import { TbGpsFilled } from "react-icons/tb";
import Link from "next/link";

const DEFAULT_CENTER = { lat: 27.7172, lng: 85.324 }; // Kathmandu fallback

export default function HomeMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const { selectedMarker, setSelectedMarker, data } = useData();

  // Ensure that data is an array of Location or fallback to an empty array
  const locations: Location[] = Array.isArray(data) ? data : [];

  const [selected, setSelected] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load user's location or saved center
  useEffect(() => {
    const savedCenter = localStorage.getItem("mapCenter");
    if (savedCenter) {
      const parsed = JSON.parse(savedCenter);
      setMapCenter(parsed);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.warn("Geolocation permission denied or unavailable.");
        }
      );
    }
  }, []);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleCenterChanged = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        const newCenter = {
          lat: center.lat(),
          lng: center.lng(),
        };
        localStorage.setItem("mapCenter", JSON.stringify(newCenter));
      }
    }
  };

  const handleMarkerClick = (loc: Location) => {
    setSelectedMarker(loc);
    setSelected(loc);
  };

  useEffect(() => {
    if (selectedMarker && mapRef.current) {
      const position = {
        lat: selectedMarker["Maps details"].coordinates[0],
        lng: selectedMarker["Maps details"].coordinates[1],
      };

      mapRef.current.setZoom(10);
      mapRef.current.panTo(position);

      setTimeout(() => {
        mapRef.current?.setZoom(16);
      }, 300);

      setSelected(selectedMarker);
    }
  }, [selectedMarker]);

  if (!isLoaded) return <div>Loading...</div>;

  const customIconSVG = (color: string) =>
    renderToStaticMarkup(
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="white"
          stroke={color}
          strokeWidth="4"
        />
        <g transform="translate(15, 15) rotate(180 10 10)">
          <RiWaterFlashFill color={color} size={30} />
        </g>
      </svg>
    );

  const customIcon = (available: boolean) =>
    `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
      customIconSVG(available ? "blue" : "red")
    )}`;

  return (
    <div className="relative h-[calc(100vh-70px)] lg:h-full w-full">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={13}
        onLoad={handleMapLoad}
        onCenterChanged={handleCenterChanged}
      >
        {locations.map((loc, index) => {
          const coordinates = loc["Maps details"]?.coordinates;
          if (!coordinates) return null;

          return (
            <Marker
              key={index}
              position={{
                lat: coordinates[0],
                lng: coordinates[1],
              }}
              title={loc["Name of the location"] || `Location ${index + 1}`}
              icon={{
                url: customIcon(loc.available),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => handleMarkerClick(loc)}
            />
          );
        })}

        {selected && (
          <InfoWindow
            position={{
              lat: selected["Maps details"].coordinates[0],
              lng: selected["Maps details"].coordinates[1],
            }}
            onCloseClick={() => setSelected(null)}
            options={{ disableAutoPan: true }}
          >
            <div>
              <div className="flex justify-between px-5 gap-5">
                <h2 className="font-semibold text-base text-center">
                  {selected["Name of the location"]}
                </h2>
                <div className="flex justify-center items-center gap-2 ">
                  <div
                    className={`block w-2 h-2 rounded-full ${
                      selected.available ? "bg-blue-500" : "bg-red-500"
                    }`}
                  />
                  {selected.available ? "Available" : "Unavailable"}
                </div>
              </div>
              <hr className="border border-gray-100 my-5" />
              <div className="flex">
                <div className="flex-1">
                  <div className="leading-6 gap-5 justify-between items-center px-5 flex flex-col">
                    <div className="flex-1">
                      <p className="text-sm ">
                        {selected.address.street1}
                        <br />
                        {selected.address.street2}
                      </p>
                      <p>
                        {selected.address.city}, <br /> {selected.address.state}
                      </p>
                    </div>
                    <Link
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selected["Maps details"].coordinates[0]},${selected["Maps details"].coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 justify-center items-center bg-black text-white mt-5 px-5 py-2 hover:scale-95 transition-all duration-500"
                    >
                      <TbGpsFilled className="text-lg" />
                      Get Direction
                    </Link>
                  </div>
                </div>
                <div className=" text-center bg-gray-100 shadow p-2 rounded-lg font-semibold">
                  {selected["Name of the charger"]} Charger
                  {selected["Plugs details"].map((item, i) => (
                    <div
                      key={i}
                      className="mt-5 bg-white shadow-lg flex rounded-lg p-2  font-semibold"
                    >
                      <div className="flex flex-col justify-center py-2 px-5">
                        {item.physicalReference}
                        <RiChargingPile2Fill className="text-4xl" />
                        {item.maxOutputPower} KW
                      </div>
                      <div className=" px-5 font-normal text-center flex-1 justify-center items-center flex flex-col gap-5">
                        Status
                        <br />
                        {item.connectorStatus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full text-center p-5 font-semibold">
                Contact No. {selected["Contact No"]}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
