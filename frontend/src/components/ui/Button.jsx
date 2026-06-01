import PropTypes from "prop-types";
import clsx from "clsx";


const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  onClick,
  className,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        {
          "btn--full-width": fullWidth,
          "btn--loading": loading,
        },
        className
      )}
    >
      {loading ? (
        <span className="btn__loader" />
      ) : (
        <>
          {leftIcon && (
            <span className="btn__icon">
              {leftIcon}
            </span>
          )}

          <span className="btn__label">
            {children}
          </span>

          {rightIcon && (
            <span className="btn__icon">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};


Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    "button",
    "submit",
    "reset",
  ]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "ghost",
  ]),
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
