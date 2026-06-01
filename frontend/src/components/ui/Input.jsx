import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder = "",
      error,
      helperText,
      required = false,
      disabled = false,
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          "input-group",
          {
            "input-group--full":
              fullWidth,
          }
        )}
      >
        {label && (
          <label
            htmlFor={props.name}
            className="input-label"
          >
            {label}

            {required && (
              <span className="input-required">
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "input",
            {
              "input--error":
                Boolean(error),
            },
            className
          )}
          {...props}
        />

        {error ? (
          <span className="input-error">
            {error}
          </span>
        ) : (
          helperText && (
            <span className="input-helper">
              {helperText}
            </span>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
