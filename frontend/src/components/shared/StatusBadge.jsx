import PropTypes from "prop-types";
import clsx from "clsx";

const StatusBadge = ({
  status,
  label,
}) => {
  return (
    <span
      className={clsx(
        "status-badge",
        `status-badge--${status}`
      )}
    >
      {label}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf([
    "success",
    "warning",
    "danger",
    "info",
    "neutral",
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

export default StatusBadge;