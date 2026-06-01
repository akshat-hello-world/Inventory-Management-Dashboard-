import PropTypes from "prop-types";
import clsx from "clsx";

const Loader = ({
  size = "md",
  label,
  centered = true,
  className,
}) => {
  return (
    <div
      className={clsx(
        "loader-wrapper",
        {
          "loader-wrapper--center":
            centered,
        },
        className
      )}
    >
      <span
        className={clsx(
          "loader",
          `loader--${size}`
        )}
      />

      {label && (
        <span className="loader-label">
          {label}
        </span>
      )}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),
  label: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
};

export default Loader;