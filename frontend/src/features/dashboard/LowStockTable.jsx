import PropTypes from "prop-types";

import DataTable from "../../components/shared/DataTable";
import StatusBadge from "../../components/shared/StatusBadge";

const LowStockTable = ({
  products = [],
}) => {
  const columns = [
    {
      key: "name",
      title: "Product",
    },

    {
      key: "sku",
      title: "SKU",
    },

    {
      key: "stock_quantity",
      title: "Stock Left",
      render: (row) => (
        <strong>
          {row.stock_quantity}
        </strong>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (row) => {
        if (
          row.stock_quantity === 0
        ) {
          return (
            <StatusBadge
              status="danger"
              label="Out of Stock"
            />
          );
        }

        return (
          <StatusBadge
            status="warning"
            label="Low Stock"
          />
        );
      },
    },
  ];

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3>
          Low Stock Products
        </h3>

        <span className="dashboard-card-count">
          {products.length}
        </span>
      </div>

      <DataTable
        columns={columns}
        data={products}
        emptyTitle="No Low Stock Products"
        emptyDescription="All products currently have healthy inventory levels."
      />
    </div>
  );
};

LowStockTable.propTypes = {
  products:
    PropTypes.arrayOf(
      PropTypes.shape({
        id:
          PropTypes.number,
        name:
          PropTypes.string,
        sku:
          PropTypes.string,
        stock_quantity:
          PropTypes.number,
      })
    ),
};

export default LowStockTable;