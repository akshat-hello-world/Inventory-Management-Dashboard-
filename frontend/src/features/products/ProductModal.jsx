import { useState } from "react";
import PropTypes from "prop-types";

import Modal from "../../components/ui/Modal";
import ProductForm from "./ProductForm";

import {
  createProduct,
  updateProduct,
} from "./api";

import {
  notify,
} from "../../components/ui/ToastProvider";

const ProductModal = ({
  isOpen,
  product,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] =
    useState(false);

  const isEditMode =
    Boolean(product);

  const handleSubmit = async (
    values
  ) => {
    try {
      setLoading(true);

      const payload = {
        ...values,
        sku: values.sku
          .trim()
          .toUpperCase(),
      };

      if (isEditMode) {
        await updateProduct(
          product.id,
          payload
        );

        notify.success(
          "Product updated successfully."
        );
      } else {
        await createProduct(
          payload
        );

        notify.success(
          "Product created successfully."
        );
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      notify.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      title={
        isEditMode
          ? "Edit Product"
          : "Create Product"
      }
      onClose={onClose}
    >
      <ProductForm
        loading={loading}
        initialValues={
          product
        }
        onSubmit={
          handleSubmit
        }
        onCancel={
          onClose
        }
      />
    </Modal>
  );
};

ProductModal.propTypes = {
  isOpen:
    PropTypes.bool.isRequired,

  product:
    PropTypes.object,

  onClose:
    PropTypes.func
      .isRequired,

  onSuccess:
    PropTypes.func,
};

export default ProductModal;