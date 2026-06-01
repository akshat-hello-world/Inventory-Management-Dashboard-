import PropTypes from "prop-types";
import {
  Eye,
  Trash2,
} from "lucide-react";

import DataTable from "../../components/shared/DataTable";

import {
  formatCurrency,
} from "../../utils/formatCurrency";

import {
  formatDateTime,
} from "../../utils/formatDate";

const OrderTable = ({
  orders,
  loading,
  onView,
  onDelete,
}) => {
  const columns = [
    {
      key: "id",
      title: "Order ID",
      render: (row) => (
        <span className="order-id">
          #{row.id}
        </span>
      ),
    },

    {
      key: "customer",
      title: "Customer",
      render: (row) =>
        row.customer
          ?.full_name ??
        "-",
    },

    {
      key: "items",
      title: "Items",
      render: (row) =>
        row.order_items
          ?.length ?? 0,
    },

    {
      key: "total_amount",
      title: "Total",
      render: (row) => (
        <strong>
          {formatCurrency(
            row.total_amount
          )}
        </strong>
      ),
    },

    {
      key: "created_at",
      title: "Created",
      render: (row) =>
        formatDateTime(
          row.created_at
        ),
    },

    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="table-actions">
          <button
            type="button"
            className="table-action table-action--view"
            onClick={() =>
              onView(row)
            }
            aria-label="View order"
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            className="table-action table-action--delete"
            onClick={() =>
              onDelete(row)
            }
            aria-label="Delete order"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      loading={loading}
      emptyTitle="No Orders Found"
      emptyDescription="Create your first order to start tracking sales and inventory."
    />
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array,
  loading: PropTypes.bool,

  onView:
    PropTypes.func
      .isRequired,

  onDelete:
    PropTypes.func
      .isRequired,
};

export default OrderTable;