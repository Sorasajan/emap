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

const DEFAULT_CENTER = { lat: 27.7172, lng: 85.324 }; // Kathmandu fallback

export default function HomeMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const { selectedMarker, setSelectedMarker, data } = useData();
  const locations = data?.data?.locations || [];

  const [selected, setSelected] = useState(null);
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

  const handleMarkerClick = (loc: any) => {
    setSelectedMarker(loc); // context
    setSelected(loc); // local
  };

  // Watch for selectedMarker from context and recenter
  useEffect(() => {
    if (selectedMarker && mapRef.current) {
      const position = {
        lat: selectedMarker.geoLocation.coordinates[0],
        lng: selectedMarker.geoLocation.coordinates[1],
      };

      mapRef.current.setZoom(10);
      mapRef.current.panTo(position);

      setTimeout(() => {
        mapRef.current?.setZoom(16);
      }, 300);

      // Show InfoWindow for selected marker
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
            onClick={() => handleMarkerClick(loc)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{
              lat: selected.geoLocation.coordinates[0],
              lng: selected.geoLocation.coordinates[1],
            }}
            onCloseClick={() => setSelected(null)}
            options={{ disableAutoPan: true }}
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
