import React from "react";
import PropTypes from "prop-types";
const Label = ({ children, htmlFor = "", className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block text-sm font-medium leading-6 cursor-pointer text-text2 dark:text-text3 ${className}`}
    >
      {children}
    </label>
  );
};
Label.propTpes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};
export default Label;
