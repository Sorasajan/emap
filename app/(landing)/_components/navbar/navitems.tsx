import Link from "next/link";
import { useData } from "../context/datacontext";
import { MdArrowDropDownCircle } from "react-icons/md";
import React, { useState } from "react";
import { Location } from "@/app/(landing)/_components/types/location";

interface NavItemsProps {
  isNav: boolean;
}

interface NavItem {
  navitem: string;
  navlink: string;
}

export default function NavItems({ isNav }: NavItemsProps) {
  const [dropdownActive, isDropdownActive] = useState(false);
  const { data } = useData();
  const locations: Location[] = Array.isArray(data) ? data : [];

  // Get unique states based on address.state and sort alphabetically
  const uniqueLocations = Array.from(
    new Map(
      [...locations]
        .sort((a, b) => a.address.state.localeCompare(b.address.state))
        .map((item) => [item.address.state, item])
    ).values()
  );

  const navitems: NavItem[] = [
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
      {uniqueLocations.length > 0 && (
        <div className="relative group">
          <button
            type="button"
            onClick={() => isDropdownActive(!dropdownActive)}
            className="flex w-full gap-2 items-center py-2 md:px-5 group-hover:cursor-pointer font-semibold group-hover:text-green-600 group-hover:border-b border-green-500 transition-colors"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="locations-dropdown"
          >
            Locations
            <MdArrowDropDownCircle
              className={`text-lg ${
                dropdownActive ? "" : "rotate-180"
              } transition-transform duration-300`}
            />
          </button>
          <div
            id="locations-dropdown"
            className={`md:absolute top-full left-0 w-52 md:bg-gray-200 md:shadow-md overflow-auto   ${
              dropdownActive ? "max-h-100  " : "max-h-0"
            } overflow-hidden  transition-all duration-300 z-10`}
            role="menu"
          >
            {uniqueLocations.map((item, index) => (
              <div key={index}>
                <Link
                  href={`/chargers/${item.address.state}`}
                  className="border border-gray-100 p-3 hover:bg-green-500 hover:text-white hover:scale-95 transition-all duration-300 block"
                  role="menuitem"
                >
                  {item.address.state}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

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
