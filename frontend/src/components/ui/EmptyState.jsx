import PropTypes from "prop-types";

import Button from "./Button";

const EmptyState = ({
  title = "No Data Found",
  description = "There is currently no data available.",
  image,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state">
      {image && (
        <img
          src={image}
          alt={title}
          className="empty-state-image"
        />
      )}

      <h3 className="empty-state-title">
        {title}
      </h3>

      <p className="empty-state-description">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
};

export default EmptyState;