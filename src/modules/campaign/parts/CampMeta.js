import React from "react";

const CampMeta = ({
  number = "$2,000",
  text = "Raised of $1,900",
  size = "small",
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <h4
        className={`font-semibold text-text2 ${
          size === "small" ? "text-sm" : "text-xl"
        }`}
      >
        {number}
      </h4>
      <span
        className={`${size === "small" ? "text-xs" : "text-base"} text-text4"`}
      >
        {text}
      </span>
    </div>
  );
};

export default CampMeta;
