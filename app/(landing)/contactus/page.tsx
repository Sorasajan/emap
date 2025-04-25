import contactus from "@/public/image/contactus.svg";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div>
      <div className="bg-gray-100">
        <div className="max-w-[1366px] mx-auto">
          <div className="flex justify-between relative ">
            <div className="pt-20">
              <p className="text-green-600 text-6xl font-semibold">
                Get in Touch
              </p>
              <p className="font-light text-3xl mt-3">
                Got questions? We’ve got time!
              </p>
            </div>
            <Image
              src={contactus}
              alt="contact us"
              className="bg-blend-multiply"
            />
            <div className="absolute -bottom-25 flex gap-20">
              <div className="w-90 text-center gap-5 bg-green-200 p-10 rounded-lg flex flex-col justify-center items-center">
                <FaPhoneAlt className="text-6xl text-green-400" />
                <p className="text-xl font-semibold">Talk to Sales</p>
                <p>
                  Interested in Heritage Charger! Just pick up the phone to chat
                  with a member of our sales team.
                </p>
                <p>980-0-000000</p>
              </div>
              <div className="w-90 text-center gap-5 bg-green-200 p-10 rounded-lg flex flex-col justify-center items-center">
                <BiSupport className="text-7xl text-green-400" />
                <p className="text-xl font-semibold">Customer Service</p>
                <p>
                  Sometimes you need a little help from your friends. Or a
                  Heritage support rep. Don’t worry… we’re here for you.
                </p>
                <p>980-0-000000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-40 py-10 text-center text-3xl font-light">
        <p>Get in Touch with our Head Office</p>
        <div className="max-w-[1366px] border border-black mx-auto rounded-lg overflow-hidden flex">
          <div className="bg-green-100 flex-1">google map</div>
          <div className="p-5 px-10 text-base text-left">
            <p>Address 1</p>
            <p>Address 2</p>
            <p>Kathmandu, Nepal</p>

            <p className="font-semibold text-lg mt-10">Contact Number</p>
            <p>phone no.</p>
            <p>Landline no.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
