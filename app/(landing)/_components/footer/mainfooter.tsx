import Link from "next/link";

export default function MainFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-4 text-sm text-gray-500 space-y-2 bg-green-600 text-white">
        
      <div>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <div>
        &copy; {year} Heritage Charge Point Pvt. Ltd. All rights reserved.
        Powered by Touch Technology
      </div>
      <div className="flex justify-center space-x-4">
        <a
          href="https://apps.apple.com/in/app/heritage-charge-point/id6504744834" // Replace with your actual iOS app link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Download on the App Store
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.bpm.heritageapp&hl=en" // Replace with your actual Android app link
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Get it on Google Play
        </a>
      </div>
    </footer>
  );
}
