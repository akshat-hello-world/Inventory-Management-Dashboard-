import { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    if (closeOnBackdrop) {
      onClose?.();
    }
  };

  const handleContentClick = (
    event
  ) => {
    event.stopPropagation();
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={clsx(
          "modal",
          `modal--${size}`
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={handleContentClick}
      >
        <div className="modal-header">
          <h2
            id="modal-title"
            className="modal-title"
          >
            {title}
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
    "xl",
  ]),
  closeOnBackdrop: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
