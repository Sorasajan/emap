import LocationBox from "./_components/map/locationbox";
import HomeMap from "./_components/map/map";

export default function LandingHome() {
  return (
    <div className="lg:flex relative">
      <div className="lg:flex-1">
        <HomeMap />
      </div>
      <div className="overflow-y-auto bg-gray-100 lg:h-[calc(100vh-140px)]">
        <LocationBox />
      </div>
    </div>
  );
}
