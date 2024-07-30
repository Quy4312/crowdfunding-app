import React from "react";

const CampDesc = ({ children, className = "mb-4 text-xs" }) => {
  return <p className={`text-text3 ${className}`}>{children}</p>;
};

export default CampDesc;
