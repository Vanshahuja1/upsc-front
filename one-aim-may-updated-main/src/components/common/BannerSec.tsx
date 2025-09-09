import React from "react";

const BannerSec = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-t from-[#FFE5E5] via-[#FFEBD9] to-[#FFE5E5] h-[20vh] flex-center space-y-4 relative  ">
      {children}
    </div>
  );
};

export default BannerSec;
