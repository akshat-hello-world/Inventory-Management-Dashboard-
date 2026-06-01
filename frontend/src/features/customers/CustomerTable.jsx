import PropTypes from "prop-types";
import {
  Edit,
  Trash2,
} from "lucide-react";

import DataTable from "../../components/shared/DataTable";

import {
  formatDate,
} from "../../utils/formatDate";

const CustomerTable = ({
  customers,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      key: "full_name",
      title: "Customer Name",
    },

    {
      key: "email",
      title: "Email",
    },

    {
      key: "phone",
      title: "Phone",
    },

    {
      key: "created_at",
      title: "Created",
      render: (row) =>
        formatDate(
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
            className="table-action table-action--edit"
            onClick={() =>
              onEdit(row)
            }
            aria-label="Edit customer"
          >
            <Edit size={16} />
          </button>

          <button
            type="button"
            className="table-action table-action--delete"
            onClick={() =>
              onDelete(row)
            }
            aria-label="Delete customer"
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
      data={customers}
      loading={loading}
      emptyTitle="No Customers Found"
      emptyDescription="Add your first customer to start creating orders."
    />
  );
};

CustomerTable.propTypes = {
  customers: PropTypes.array,
  loading: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomerTable;