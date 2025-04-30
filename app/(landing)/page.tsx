import LocationBox from "./_components/map/locationbox";
import HomeMap from "./_components/map/map";

export default function LandingHome() {
  return (
    <div className="md:flex">
      <div className="md:flex-1">
        <HomeMap />
      </div>
      <div className="w-full md:w-100 overflow-y-auto bg-gray-100 md:h-[calc(100vh-70px)]">
        <LocationBox />
      </div>
    </div>
  );
}
