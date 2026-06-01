import PropTypes from "prop-types";

import Loader from "../ui/Loader";
import EmptyState from "../ui/EmptyState";

const DataTable = ({
  columns,
  data,
  loading = false,
  emptyTitle = "No Data Found",
  emptyDescription = "There are no records available.",
  emptyImage,
}) => {
  if (loading) {
    return (
      <Loader
        size="lg"
        label="Loading..."
      />
    );
  }

  if (!data?.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        image={emptyImage}
      />
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(
              (column) => (
                <th
                  key={column.key}
                >
                  {column.title}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={
                row.id ??
                index
              }
            >
              {columns.map(
                (column) => (
                  <td
                    key={
                      column.key
                    }
                  >
                    {column.render
                      ? column.render(
                          row
                        )
                      : row[
                          column.key
                        ]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key:
        PropTypes.string
          .isRequired,
      title:
        PropTypes.string
          .isRequired,
      render:
        PropTypes.func,
    })
  ).isRequired,

  data: PropTypes.array,

  loading: PropTypes.bool,

  emptyTitle:
    PropTypes.string,

  emptyDescription:
    PropTypes.string,

  emptyImage:
    PropTypes.string,
};

export default DataTable;