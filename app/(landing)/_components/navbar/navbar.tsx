import logo from "@/public/heritage.webp";
import Image from "next/image";
import Link from "next/link";
export default function LandingNavbar() {
  return (
    <div className="flex justify-between bg-green-600 sticky top-0 items-center px-5">
      <Link href="/">
        <div className="px-5 ml-5 flex items-center bg-white gap-2 pr-10">
          <Image src={logo} alt="heritage" height={65} />
          <div>
            <p className="text-2xl font-bold text-green-600">HERITAGE</p>
            <p className="text-sm  text-center bg-green-500 text-white px-2 font-semibold ">
              Charge Point
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <div>Locations</div>
        <div>Trip Planner</div>
        <div>Services</div>
      </div>
    </div>
  );
}
