import { useEffect } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const customerSchema = z.object({
  full_name: z
    .string()
    .min(
      2,
      "Customer name must be at least 2 characters."
    )
    .max(
      100,
      "Customer name is too long."
    ),

  email: z
    .string()
    .email(
      "Please enter a valid email address."
    ),

  phone: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Phone number must be exactly 10 digits."
    ),
});

const CustomerForm = ({
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
    resolver: zodResolver(
      customerSchema
    ),

    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    reset({
      full_name:
        initialValues.full_name ??
        "",

      email:
        initialValues.email ??
        "",

      phone:
        initialValues.phone ??
        "",
    });
  }, [
    initialValues,
    reset,
  ]);

  const handleFormSubmit = (
    values
  ) => {
    onSubmit({
      ...values,
      email: values.email
        .trim()
        .toLowerCase(),
      phone: values.phone.trim(),
      full_name:
        values.full_name.trim(),
    });
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit(
        handleFormSubmit
      )}
    >
      <div className="form-grid">
        <Input
          label="Customer Name"
          placeholder="John Doe"
          required
          error={
            errors.full_name
              ?.message
          }
          {...register(
            "full_name"
          )}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          required
          error={
            errors.email
              ?.message
          }
          {...register(
            "email"
          )}
        />

        <Input
          label="Phone Number"
          placeholder="9876543210"
          required
          error={
            errors.phone
              ?.message
          }
          {...register(
            "phone"
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
            ? "Update Customer"
            : "Create Customer"}
        </Button>
      </div>
    </form>
  );
};

CustomerForm.propTypes = {
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

export default CustomerForm;