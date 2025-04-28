"use client";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { renderToStaticMarkup } from "react-dom/server";
import { RiWaterFlashFill } from "react-icons/ri";
import { useState, useEffect } from "react";

export default function HomeMap({ data }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const locations = data?.data?.locations || [];

  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 27.7172, lng: 85.324 });

  useEffect(() => {
    // Try to get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setMapCenter({ lat: userLat, lng: userLng });
        },
        () => {
          // If location access denied or fails, fallback to average location
          if (locations.length > 0) {
            const avgLat =
              locations.reduce(
                (sum, loc) => sum + loc.geoLocation.coordinates[0],
                0
              ) / locations.length;
            const avgLng =
              locations.reduce(
                (sum, loc) => sum + loc.geoLocation.coordinates[1],
                0
              ) / locations.length;

            setMapCenter({ lat: avgLat, lng: avgLng });
          }
        }
      );
    }
  }, [locations]);

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
    <div className="h-[calc(100vh-70px)] md:h-full w-full">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={13}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{
              lat: loc.geoLocation.coordinates[0],
              lng: loc.geoLocation.coordinates[1],
            }}
            title={loc.name || `Location ${index + 1}`}
            icon={{
              url: customIcon(loc.available),
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => setSelected(loc)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: selected.geoLocation.coordinates[0],
              lng: selected.geoLocation.coordinates[1],
            }}
            onCloseClick={() => setSelected(null)}
            options={{ disableAutoPan: true }} // important!
          >
            <div>
              <h2 className="font-bold">{selected.name}</h2>
              <div className="flex justify-center items-center gap-2">
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
