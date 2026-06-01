import PropTypes from "prop-types";
import {
  Edit,
  MoreHorizontal,
  Package,
  Trash2,
} from "lucide-react";

import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import StatusBadge from "../../components/shared/StatusBadge";

import { formatCurrency } from "../../utils/formatCurrency";

const ProductTable = ({
  products,
  loading,
  viewMode = "list",
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <Loader
        size="lg"
        label="Loading inventory..."
      />
    );
  }

  if (!products?.length) {
    return (
      <EmptyState
        title="No Products Found"
        description="Create your first product to start managing inventory."
      />
    );
  }

  const getStockBadge = (
    stockQuantity
  ) => {
    if (stockQuantity === 0) {
      return (
        <StatusBadge
          status="danger"
          label="Out of Stock"
        />
      );
    }

    if (stockQuantity <= 10) {
      return (
        <StatusBadge
          status="warning"
          label="Low Stock"
        />
      );
    }

    return (
      <StatusBadge
        status="success"
        label="In Stock"
      />
    );
  };

  return (
    <div
      className={
        viewMode === "grid"
          ? "inventory-list inventory-list--grid"
          : "inventory-list"
      }
    >
      {products.map((product) => (
        <article
          className="inventory-row"
          key={product.id}
        >
          <div className="inventory-product">
            <div className="inventory-thumb">
              <Package size={28} />
            </div>

            <div className="inventory-product-copy">
              <div className="inventory-product-title">
                {product.name}
              </div>

              <div className="inventory-product-meta">
                <span>
                  SKU {product.sku}
                </span>

                <span>
                  Serialized Product
                </span>

                <strong>
                  {product.stock_quantity} in stock
                </strong>
              </div>

              <div className="inventory-row-badges">
                {getStockBadge(
                  product.stock_quantity
                )}
              </div>
            </div>
          </div>

          <div className="inventory-price-block">
            <span>
              Retail Price
            </span>

            <strong>
              {formatCurrency(
                product.price
              )}
            </strong>
          </div>

          <div className="inventory-price-block">
            <span>
              Wholesale Price
            </span>

            <strong>
              {formatCurrency(
                Number(product.price) *
                  0.86
              )}
            </strong>
          </div>

          <div className="inventory-row-actions">
            <button
              type="button"
              className="table-action table-action--edit"
              onClick={() =>
                onEdit(product)
              }
              aria-label="Edit product"
              title="Edit product"
            >
              <Edit size={16} />
            </button>

            <button
              type="button"
              className="table-action table-action--delete"
              onClick={() =>
                onDelete(product)
              }
              aria-label="Delete product"
              title="Delete product"
            >
              <Trash2 size={16} />
            </button>

            <button
              type="button"
              className="table-action table-action--view"
              aria-label="More options"
              title="More options"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  viewMode: PropTypes.oneOf([
    "list",
    "grid",
  ]),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductTable;
