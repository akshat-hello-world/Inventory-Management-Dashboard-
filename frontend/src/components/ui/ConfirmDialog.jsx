import PropTypes from "prop-types";

import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "danger",
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={variant}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="confirm-dialog-message">
        {message}
      </p>
    </Modal>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "ghost",
  ]),
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmDialog;
