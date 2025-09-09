import Header from "@/components/Header";
import React from "react";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${poppins.variable}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
