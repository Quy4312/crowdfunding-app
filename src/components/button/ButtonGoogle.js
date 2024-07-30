import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "components/common/ErrorComponent";

const ButtonGoogle = ({ text = "Sign up with google", onClick = () => {} }) => {
  return (
    <button
      className="flex items-center justify-center w-full py-4 mb-5 border gap-x-3 border-strock rounded-xl text-text2"
      onClick={onClick}
    >
      <img srcSet="icon-google.png 2x" alt="" />
      <span className="text-base font-semibold leading-7 underline dark:text-white dark:border-darkStroke ">
        {text}
      </span>
    </button>
  );
};
ButtonGoogle.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
export default withErrorBoundary(ButtonGoogle, {
  FallbackComponent: ErrorComponent,
});
