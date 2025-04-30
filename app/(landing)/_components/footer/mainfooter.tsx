import logo from "@/public/heritage.webp";
import Image from "next/image";
import Link from "next/link";

export default function MainFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        <Image
          src={logo}
          alt="Heritage Charging Point Logo"
          width={100}
          height={100}
          className="rounded-full"
        />

        <div>
          <h2 className="text-2xl font-bold">Heritage Charging Point</h2>
          <p className="mt-2 max-w-md leading-relaxed">
            With over <strong>100+ charging stations</strong> across Nepal,
            Heritage ensures your electric vehicle is always ready to go.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/termsofservice" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/contactus" className="hover:underline">
            Contact Us
          </Link>
        </nav>

        <div className="text-xs text-gray-200 text-center">
          &copy; {year} Heritage Charge Point Pvt. Ltd. <br />
          All rights reserved. Powered by Touch Technology.
        </div>
      </div>
    </footer>
  );
}
