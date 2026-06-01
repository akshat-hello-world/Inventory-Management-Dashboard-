import { useEffect } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const productSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "Product name must be at least 2 characters."
    ),

  sku: z
    .string()
    .min(
      2,
      "SKU is required."
    ),

  price: z
    .coerce
    .number()
    .positive(
      "Price must be greater than zero."
    ),

  stock_quantity: z
    .coerce
    .number()
    .int()
    .min(
      0,
      "Stock cannot be negative."
    ),
});

const ProductForm = ({
  initialValues,
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    resolver:
      zodResolver(
        productSchema
      ),

    defaultValues: {
      name: "",
      sku: "",
      price: "",
      stock_quantity: "",
    },
  });

  useEffect(() => {
    if (
      initialValues
    ) {
      reset({
        name:
          initialValues.name ??
          "",

        sku:
          initialValues.sku ??
          "",

        price:
          initialValues.price ??
          "",

        stock_quantity:
          initialValues.stock_quantity ??
          "",
      });
    }
  }, [
    initialValues,
    reset,
  ]);

  return (
    <form
      className="form"
      onSubmit={handleSubmit(
        onSubmit
      )}
    >
      <div className="product-form-grid">
        <Input
          label="Product Name"
          placeholder="Mechanical Keyboard"
          required
          error={
            errors.name
              ?.message
          }
          {...register(
            "name"
          )}
        />

        <Input
          label="SKU"
          placeholder="KB-001"
          required
          error={
            errors.sku
              ?.message
          }
          {...register(
            "sku"
          )}
        />

        <Input
          label="Price"
          type="number"
          placeholder="3499"
          required
          error={
            errors.price
              ?.message
          }
          {...register(
            "price"
          )}
        />

        <Input
          label="Stock Quantity"
          type="number"
          placeholder="15"
          required
          error={
            errors
              .stock_quantity
              ?.message
          }
          {...register(
            "stock_quantity"
          )}
        />
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={
            onCancel
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={
            loading
          }
        >
          {initialValues
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

ProductForm.propTypes = {
  initialValues:
    PropTypes.object,

  loading:
    PropTypes.bool,

  onSubmit:
    PropTypes.func
      .isRequired,

  onCancel:
    PropTypes.func,
};

export default ProductForm;
