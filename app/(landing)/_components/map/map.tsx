"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { renderToStaticMarkup } from "react-dom/server";
import { RiWaterFlashFill } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { useData } from "../context/datacontext";
import { TbGpsFilled } from "react-icons/tb";
import { Location } from "@/app/(landing)/_components/types/location";

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
      customIconSVG(available ? "green" : "red")
    )}`;

  return (
    <div className="relative h-[calc(100vh-70px)] md:h-full w-full">
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
            <div className="w-[20vw]">
              <h2 className="font-semibold text-xl text-center">
                {selected["Name of the location"]}
              </h2>
              <hr className="border border-gray-100 my-5" />
              <div className="text-center leading-6 flex gap-5 justify-between items-center px-5">
                <div>
                  <p className="text-base">
                    {selected.address.street1}
                    {selected.address.street2 &&
                      `, ${selected.address.street2}`}
                  </p>
                  <p>
                    {selected.address.city}, {selected.address.state}
                  </p>
                </div>
                <div>
                  <TbGpsFilled className="text-4xl hover:scale-110 transition-all duration-500" />
                </div>
              </div>
              {selected["Contact No"] && <div>{selected["Contact No"]}</div>}
              <div className="flex justify-center items-center gap-2 mt-2">
                <div
                  className={`block w-2 h-2 rounded-full ${
                    selected.available ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                Status: {selected.available ? "Available" : "Unavailable"}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
