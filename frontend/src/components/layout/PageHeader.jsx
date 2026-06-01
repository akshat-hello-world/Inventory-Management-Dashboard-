import PropTypes from "prop-types";

import Button from "../ui/Button";

const PageHeader = ({
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
  actionVariant = "primary",
}) => {
  return (
    <div className="page-header">
      <div className="page-header-content">
        <h1 className="page-header-title">
          {title}
        </h1>

        {description && (
          <p className="page-header-description">
            {description}
          </p>
        )}
      </div>

      {actionLabel && (
        <Button
          variant={actionVariant}
          leftIcon={actionIcon}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  actionIcon: PropTypes.node,
  actionVariant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "ghost",
  ]),
};

export default PageHeader;