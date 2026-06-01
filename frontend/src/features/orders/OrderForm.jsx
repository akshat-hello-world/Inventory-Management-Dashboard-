import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Plus, Trash2 } from "lucide-react";

import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";

import OrderSummary from "./OrderSummary";

const OrderForm = ({
  customers = [],
  products = [],
  loading = false,
  onSubmit,
  onCancel,
}) => {
  const [customerId, setCustomerId] =
    useState("");

  const [items, setItems] =
    useState([
      {
        product_id: "",
        quantity: 1,
      },
    ]);

  const [errors, setErrors] =
    useState({});

  // ==========================================
  // Helpers
  // ==========================================

  const productMap =
    useMemo(() => {
      return products.reduce(
        (acc, product) => {
          acc[product.id] = product;
          return acc;
        },
        {}
      );
    }, [products]);

  // ==========================================
  // Item Management
  // ==========================================

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        product_id: "",
        quantity: 1,
      },
    ]);
  };

  const removeItem = (index) => {
    setItems((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  const updateItem = (
    index,
    field,
    value
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // ==========================================
  // Validation
  // ==========================================

  const validate = () => {
    const nextErrors = {};

    if (!customerId) {
      nextErrors.customer_id =
        "Please select a customer.";
    }

    if (!items.length) {
      nextErrors.items =
        "At least one product is required.";
    }

    const selectedProducts =
      new Set();

    items.forEach(
      (item, index) => {
        if (
          !item.product_id
        ) {
          nextErrors[
            `product_${index}`
          ] =
            "Select a product.";
        }

        if (
          !item.quantity ||
          Number(
            item.quantity
          ) <= 0
        ) {
          nextErrors[
            `quantity_${index}`
          ] =
            "Quantity must be greater than zero.";
        }

        const product =
          productMap[
            item.product_id
          ];

        if (
          product &&
          Number(
            item.quantity
          ) >
            product.stock_quantity
        ) {
          nextErrors[
            `quantity_${index}`
          ] =
            `Only ${product.stock_quantity} units available.`;
        }

        if (
          selectedProducts.has(
            item.product_id
          )
        ) {
          nextErrors[
            `product_${index}`
          ] =
            "Product already added.";
        }

        selectedProducts.add(
          item.product_id
        );
      }
    );

    setErrors(nextErrors);

    return (
      Object.keys(
        nextErrors
      ).length === 0
    );
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      customer_id:
        Number(customerId),

      items: items.map(
        (item) => ({
          product_id:
            Number(
              item.product_id
            ),
          quantity:
            Number(
              item.quantity
            ),
        })
      ),
    };

    onSubmit(payload);
  };

  // ==========================================
  // Summary Items
  // ==========================================

  const summaryItems =
    items
      .filter(
        (item) =>
          item.product_id
      )
      .map((item) => {
        const product =
          productMap[
            item.product_id
          ];

        return {
          ...item,
          unit_price:
            product?.price ??
            0,
        };
      });

  return (
    <form
      className="order-form"
      onSubmit={
        handleSubmit
      }
    >
      <div className="order-form-content">
        <div className="order-form-main">
          <Select
            label="Customer"
            required
            value={
              customerId
            }
            onChange={(
              event
            ) =>
              setCustomerId(
                event.target
                  .value
              )
            }
            options={customers.map(
              (
                customer
              ) => ({
                value:
                  customer.id,
                label:
                  customer.full_name,
              })
            )}
            error={
              errors.customer_id
            }
            placeholder="Select customer"
          />

          <div className="order-items-header">
            <h3>
              Order Items
            </h3>

            <Button
              type="button"
              leftIcon={
                <Plus
                  size={16}
                />
              }
              onClick={
                addItem
              }
            >
              Add Item
            </Button>
          </div>

          {items.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="order-item-row"
              >
                <Select
                  label="Product"
                  value={
                    item.product_id
                  }
                  onChange={(
                    event
                  ) =>
                    updateItem(
                      index,
                      "product_id",
                      event.target
                        .value
                    )
                  }
                  options={products.map(
                    (
                      product
                    ) => ({
                      value:
                        product.id,
                      label: `${product.name} (${product.stock_quantity} in stock)`,
                    })
                  )}
                  error={
                    errors[
                      `product_${index}`
                    ]
                  }
                />

                <Input
                  label="Quantity"
                  type="number"
                  min="1"
                  value={
                    item.quantity
                  }
                  onChange={(
                    event
                  ) =>
                    updateItem(
                      index,
                      "quantity",
                      event.target
                        .value
                    )
                  }
                  error={
                    errors[
                      `quantity_${index}`
                    ]
                  }
                />

                <button
                  type="button"
                  className="order-item-remove"
                  onClick={() =>
                    removeItem(
                      index
                    )
                  }
                  disabled={
                    items.length ===
                    1
                  }
                >
                  <Trash2
                    size={18}
                  />
                </button>
              </div>
            )
          )}

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
              Create Order
            </Button>
          </div>
        </div>

        <div className="order-form-sidebar">
          <OrderSummary
            items={
              summaryItems
            }
          />
        </div>
      </div>
    </form>
  );
};

OrderForm.propTypes = {
  customers:
    PropTypes.array,

  products:
    PropTypes.array,

  loading:
    PropTypes.bool,

  onSubmit:
    PropTypes.func
      .isRequired,

  onCancel:
    PropTypes.func,
};

export default OrderForm;