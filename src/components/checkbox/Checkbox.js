import React from "react";

const Checkbox = ({
  checked = false,
  name = "",
  onClick = () => {},
  children,
}) => {
  return (
    <div className="flex items-start gap-x-5">
      <div
        className={`inline-flex items-center justify-center  text-white w-5 h-5 border rounded cursor-pointer ${
          !!checked
            ? "border-primary bg-primary"
            : "border-strock dark:border-text3"
        }`}
        onClick={onClick}
      >
        <input
          name={name}
          type="checkbox"
          className="hidden"
          onChange={() => {}}
        />
        <span className={`${checked ? "" : "opacity-0 invisible"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
      </div>
      {children && (
        <div className="cursor-pointer" onClick={onClick}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
