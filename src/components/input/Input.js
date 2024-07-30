import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const Input = ({
  control,
  name,
  type = "text",
  error = "",
  placeholder = "",
  children,
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        autoComplete="off"
        id={name}
        type={type}
        className={`w-full px-6 py-4 text-sm font-medium border  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white bg-transparent ${
          children ? "pr-14" : ""
        } ${
          error.length > 0
            ? "border-error text-error"
            : "border-strock text-text1 dark:border-darkStroke"
        }`}
        {...rest}
        placeholder={error.length > 0 ? "" : placeholder}
        {...field}
      />
      {error.length > 0 && (
        <span className="absolute text-sm font-medium pointer-events-none text-error top-2/4 -translate-y-2/4 left-6 error-input">
          {error}
        </span>
      )}
      {children && (
        <div className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
          {children}
        </div>
      )}
    </div>
  );
};
Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  control: PropTypes.any.isRequired,
};
export default withErrorBoundary(Input, {
  FallbackComponent: ErrorComponent,
});
