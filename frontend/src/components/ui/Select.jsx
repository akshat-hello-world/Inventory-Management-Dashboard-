import PropTypes from "prop-types";
import clsx from "clsx";

const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Select an option",
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className,
  ...props
}) => {
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
          htmlFor={name}
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

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={clsx(
          "select",
          {
            "select--error":
              Boolean(error),
          },
          className
        )}
        {...props}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

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
};

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;