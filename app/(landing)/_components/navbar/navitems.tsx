import Link from "next/link";
import { useData } from "../context/datacontext";
import { MdArrowDropDownCircle } from "react-icons/md";
import React from "react";
import { Location } from "@/app/(landing)/_components/types/location";

interface NavItemsProps {
  isNav: boolean;
}

interface NavItem {
  navitem: string;
  navlink: string;
}

export default function NavItems({ isNav }: NavItemsProps) {
  const { data } = useData();
  const locations: Location[] = Array.isArray(data?.data) ? data.data : [];

  // Get unique states based on address.state
  const uniqueLocations = Array.from(
    new Map(locations.map((item) => [item.address.state, item])).values()
  );

  const navitems: NavItem[] = [
    { navitem: "EMI Calculator", navlink: "/emi_calculator" },
    { navitem: "Download", navlink: "/downloads" },
    { navitem: "Contact Us", navlink: "/contactus" },
  ];

  return (
    <nav
      className={`${
        isNav ? "flex flex-col p-5" : "hidden"
      } md:flex md:flex-row md:items-center gap-5`}
    >
      {/* Locations Dropdown */}
      <div className="relative group">
        <button
          type="button"
          className="flex gap-2 items-center py-2 md:px-5 font-semibold group-hover:text-green-600 group-hover:border-b border-green-500 transition-colors"
          aria-haspopup="true"
        >
          Locations
          <MdArrowDropDownCircle className="text-lg group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <div
          className="absolute top-full left-0 w-52 bg-gray-200 shadow-md overflow-auto max-h-60 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-10"
          role="menu"
        >
          {uniqueLocations.map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 p-3 hover:bg-green-500 hover:text-white hover:scale-95 transition-all duration-300"
              role="menuitem"
            >
              {item.address.state}
            </div>
          ))}
        </div>
      </div>

      {/* Static Nav Items */}
      {navitems.map((item, index) => (
        <Link
          key={index}
          href={item.navlink}
          className="py-2 md:px-5 hover:border-b border-green-500 hover:text-green-600 font-semibold transition-colors"
        >
          {item.navitem}
        </Link>
      ))}
    </nav>
  );
}
