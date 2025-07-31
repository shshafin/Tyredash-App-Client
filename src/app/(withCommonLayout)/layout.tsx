import Footer from "@/src/components/UI/Footer";
import { Navbar } from "@/src/components/UI/navbar/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main>{children}</main> {/* Make sure this is a single child */}
      <Footer />
    </div>
  );
};

export default layout;
