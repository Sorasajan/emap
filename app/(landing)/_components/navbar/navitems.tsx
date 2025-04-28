import Link from "next/link";
import { useData } from "../context/datacontext";
import { MdArrowDropDownCircle } from "react-icons/md";

export default function NavItems({ isNav }) {
  const navitems = [
    {
      navitem: "EMI Calculator",
      navlink: "/emi_calculator",
    },
    {
      navitem: "Download",
      navlink: "/downloads",
    },
    {
      navitem: "Contact Us",
      navlink: "/contactus",
    },
  ];

  const data = useData();

  const locations = data?.data?.data?.locations;

  const uniqueLocations = Array.from(
    new Map(locations.map((item) => [item.state, item])).values()
  );

  return (
    <div
      className={`md:flex md:flex-row md:items-center gap-5 ${
        isNav ? "flex flex-col p-5" : "hidden"
      }`}
    >
      <div className="relative group">
        <div className="flex gap-2 items-center py-2 md:px-5 group-hover:border-b border-green-500 group-hover:text-green-600 font-semibold">
          Locations
          <MdArrowDropDownCircle className="text-lg group-hover:rotate-180 transition-all duration-300" />
        </div>
        <div className="md:absolute max-h-0 overflow-hidden shadow-xs group-hover:max-h-500 top-15 left-0 bg-gray-200 flex flex-col w-50 transition-all duration-500">
          {uniqueLocations.map((item, i) => (
            <div
              key={i}
              className="border border-gray-50 p-4 hover:bg-green-500 hover:text-white hover:scale-95 transition-all duration-500"
            >
              {item.state}
            </div>
          ))}
        </div>
      </div>
      {navitems.map((item, i) => (
        <div key={i}>
          <Link
            href={item.navlink}
            className="py-2 md:px-5 hover:border-b border-green-500 hover:text-green-600 font-semibold"
          >
            {item.navitem}
          </Link>
        </div>
      ))}
    </div>
  );
}
