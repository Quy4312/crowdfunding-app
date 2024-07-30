import { defaultImage } from "constants/global";
import React from "react";

const CampImage = ({ className = "h-[158px]", img = defaultImage }) => {
  return (
    <div className={`${className}`}>
      <img src={img} alt="" className="w-full h-full rounded-2xl" />
    </div>
  );
};

export default CampImage;
