import type { Metadata } from "next";

import "./globals.css";
import { DataProvider } from "./(landing)/_components/context/datacontext";

export const metadata: Metadata = {
  title: "Heritage Charge Point",
  description: "Heritage Charge Point Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
