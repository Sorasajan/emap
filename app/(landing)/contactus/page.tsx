import contactus from "@/public/image/contactus.svg";
import Image from "next/image";
import { BiSupport } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div>
      <div className="bg-gray-100">
        <div className="max-w-[1366px] mx-auto px-5">
          <div className="md:flex justify-between relative ">
            <div className="pt-10 md:pt-20 text-center md:text-left">
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
              className="bg-blend-multiply mt-10 md:mt-0 w-[30vw]"
            />
            <div className="md:absolute -bottom-40 2xl:-bottom-25 flex flex-col md:flex-row items-center  p-5 gap-5 md:gap-20">
              <div className="w-90 text-center gap-5 bg-green-200 p-10 rounded-lg flex flex-col justify-center items-center">
                <FaPhoneAlt className="text-6xl text-green-400" />
                <p className="text-xl font-semibold">Talk to Sales</p>
                <p>
                  Interested in Heritage Charger! Just pick up the phone to chat
                  with a member of our sales team.
                </p>
                <p>9802379500</p>
              </div>
              <div className="w-90 text-center gap-5 bg-green-200 p-10 rounded-lg flex flex-col justify-center items-center">
                <BiSupport className="text-7xl text-green-400" />
                <p className="text-xl font-semibold">Customer Service</p>
                <p>
                  Sometimes you need a little help from your friends. Or a
                  Heritage support rep. Don’t worry… we’re here for you.
                </p>
                <p>9802379500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto md:mt-40 py-10 text-center text-3xl font-light">
        <p>Connecting You Directly to Our Core.</p>
        <div className="max-w-[1200px] border border-black mx-auto rounded-lg overflow-hidden md:flex mt-10">
          <div className="bg-green-100 flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14130.85998993822!2d85.31804159676788!3d27.69520223805825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sshankhamul%2C%20kmc%2010%20google%20map!5e0!3m2!1sen!2snp!4v1749033658160!5m2!1sen!2snp"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-150"
            ></iframe>
          </div>
          <div
            className="p-5 px-10 w-80 text-base text-left 
flex flex-col justify-center"
          >
            <p>KMC-10, Sankhamul</p>

            <p>Kathmandu, Nepal</p>

            <p className="font-semibold text-lg mt-10">Contact Number</p>
            <p>9802379500</p>
          </div>
        </div>
        <p className="mt-10 text-lg">
          Your questions and feedback are important to us.
        </p>
      </div>
    </div>
  );
}
