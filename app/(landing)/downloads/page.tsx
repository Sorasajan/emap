"use client";

import google from "@/public/download/google.svg";
import apple from "@/public/download/apple.svg";
import bg from "@/public/download/download.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeDownload() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsIOS(/iPhone|iPad|iPod/.test(userAgent));
  }, []);

  return (
    <div className="max-2-[1366px] mx-auto text-center flex flex-col justify-center items-center ">
      <p className="mt-5 md:text-5xl font-semibold text-green-500 md:leading-16">
        Power Up Your Journey:
        <br />
        <span className="md:text-4xl font-light text-black">
          Find, Charge, and Go with Ease!
        </span>
      </p>
      <Image
        src={bg}
        alt="bg"
        className="-mt-20 md:mt-10 lg:-mt-20 w-100 md:w-[calc(30vw)]"
      />
      <div className="flex flex-col md:flex-row p-5 w-full justify-center">
        <div className=" md:h-full flex justify-center items-center p-5 flex-col px-10">
          <Link href="https://play.google.com/store/apps/details?id=com.bpm.heritageapp&hl=en">
            <Image src={google} alt="Play Store" className="w-100" />
          </Link>
        </div>
        <div
          className={`md:h-full flex justify-center items-center py-11 flex-col  px-10 ${
            isIOS ? "order-first" : "order-last"
          }`}
        >
          <Link href="https://apps.apple.com/in/app/heritage-charge-point/id6504744834">
            <Image src={apple} alt="App Store" className="w-80" />
          </Link>
        </div>
      </div>
    </div>
  );
}
