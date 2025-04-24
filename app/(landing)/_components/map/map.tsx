"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { renderToStaticMarkup } from "react-dom/server"; // To convert JSX to a static string
import { RiWaterFlashFill } from "react-icons/ri";

export default function HomeMap({ data }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const locations = data?.data?.locations || [];

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 75px)",
  };

  const center = {
    lat: 27.7172,
    lng: 85.324,
  };

  if (!isLoaded) return <div>Loading...</div>;

  // Generate the SVG string for the RiBattery2ChargeFill icon
  const customIconSVGGreen = renderToStaticMarkup(
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White circle background */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="white"
        stroke="green"
        strokeWidth="4"
      />

      {/* RiWaterFlashFill icon inside */}
      <g transform="translate(15, 15) rotate(180 10 10)">
        <RiWaterFlashFill color="green" size={30} />
      </g>
    </svg>
  );

  const customIconSVGRed = renderToStaticMarkup(
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White circle background */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="white"
        stroke="red"
        strokeWidth="4"
      />

      {/* RiWaterFlashFill icon inside */}
      <g transform="translate(15, 15) rotate(180 10 10)">
        <RiWaterFlashFill color="red" size={30} />
      </g>
    </svg>
  );
  // Encode the SVG for Google Maps
  const customIconGreen = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    customIconSVGGreen
  )}`;

  // Encode the SVG for Google Maps
  const customIconRed = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    customIconSVGRed
  )}`;

  return (
    <div className="min-h-[calc(100vh-70px)]">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{
              lat: loc.geoLocation.coordinates[0],
              lng: loc.geoLocation.coordinates[1],
            }}
            title={loc.name || `Location ${index + 1}`}
            icon={{
              url: loc.available ? customIconGreen : customIconRed,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
