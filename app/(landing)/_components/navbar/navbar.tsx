"use client";
import logo from "@/public/heritage.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import NavItems from "./navitems";
export default function LandingNavbar() {
  const [isNav, setIsNav] = useState(false);

  return (
    <div className="md:flex relative justify-between bg-white shadow-xs sticky top-0 items-center px-5 pl-0 md:pl-5 z-100 ">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="md:px-5 md:ml-5 flex items-center bg-white gap-2 pr-10 p-5">
            <Image src={logo} alt="heritage" height={50} />
          </div>
        </Link>
        <IoMenuSharp
          className="md:hidden text-3xl"
          onClick={() => setIsNav(!isNav)}
        />
      </div>
      <NavItems isNav={isNav} />
    </div>
  );
}
