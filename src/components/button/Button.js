import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Button = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  ...rest
}) => {
  const child = !!isLoading ? (
    <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
  ) : (
    children
  );
  let defaultClassName =
    "flex items-center justify-center p-4 text-base font-semibold rounded-xl  min-h-[56px]";
  switch (rest.kind) {
    case "primary":
      defaultClassName = defaultClassName + " bg-primary text-white";
      break;
    case "secondary":
      defaultClassName = defaultClassName + " bg-secondary text-white";
      break;
    case "ghost":
      defaultClassName =
        defaultClassName + " bg-secondary bg-opacity-10 text-secondary";
      break;

    default:
      break;
  }
  if (rest.href)
    return (
      <Link to={rest.href} className={`${defaultClassName} ${className}`}>
        {child}
      </Link>
    );
  return (
    <button
      className={`${defaultClassName} ${
        !!isLoading ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
      type={type}
      {...rest}
    >
      {child}
    </button>
  );
};
Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  kind: PropTypes.oneOf(["primary", "secondary", "ghost"]),
};
export default Button;
