// import type { Metadata } from "next";

import "../globals.css";
import LandingNavbar from "./_components/navbar/navbar";
import MainFooter from "./_components/footer/mainfooter";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen text-sm ">
      <LandingNavbar />
      <div className="flex-1 items-center">{children}</div>
      <MainFooter />
    </div>
  );
}
