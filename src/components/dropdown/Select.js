import React from "react";
import { useDropdown } from "./dropdown-context";

const Select = ({ placeholder = "" }) => {
  const { show, toggle } = useDropdown();
  return (
    <div
      className="flex items-center justify-between px-6 py-4 font-medium bg-white border cursor-pointer rounded-xl text-text1 border-strock"
      onClick={toggle}
    >
      <span className="capitalize text-text4">{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;
