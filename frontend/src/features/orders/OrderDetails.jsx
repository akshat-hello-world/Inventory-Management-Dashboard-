import PropTypes from "prop-types";

import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";

import {
  formatCurrency,
} from "../../utils/formatCurrency";

import {
  formatDateTime,
} from "../../utils/formatDate";

const OrderDetails = ({
  isOpen,
  order,
  onClose,
}) => {
  if (!order) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      title={`Order #${order.id}`}
      size="lg"
      onClose={onClose}
      footer={
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      }
    >
      <div className="order-details">
        <div className="order-details-grid">
          <div className="order-details-card">
            <h3>
              Customer Information
            </h3>

            <p>
              <strong>
                Name:
              </strong>{" "}
              {
                order.customer
                  ?.full_name
              }
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {
                order.customer
                  ?.email
              }
            </p>

            <p>
              <strong>
                Phone:
              </strong>{" "}
              {
                order.customer
                  ?.phone
              }
            </p>
          </div>

          <div className="order-details-card">
            <h3>
              Order Information
            </h3>

            <p>
              <strong>
                Order ID:
              </strong>{" "}
              #{order.id}
            </p>

            <p>
              <strong>
                Created:
              </strong>{" "}
              {formatDateTime(
                order.created_at
              )}
            </p>

            <p>
              <strong>
                Items:
              </strong>{" "}
              {
                order
                  .order_items
                  ?.length
              }
            </p>
          </div>
        </div>

        <div className="order-details-table">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  Product
                </th>
                <th>
                  SKU
                </th>
                <th>
                  Quantity
                </th>
                <th>
                  Unit Price
                </th>
                <th>
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {order.order_items?.map(
                (item) => (
                  <tr
                    key={item.id}
                  >
                    <td>
                      {
                        item
                          .product
                          ?.name
                      }
                    </td>

                    <td>
                      {
                        item
                          .product
                          ?.sku
                      }
                    </td>

                    <td>
                      {
                        item.quantity
                      }
                    </td>

                    <td>
                      {formatCurrency(
                        item.unit_price
                      )}
                    </td>

                    <td>
                      {formatCurrency(
                        item.quantity *
                          item.unit_price
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="order-details-footer">
          <div className="order-total-card">
            <span>
              Grand Total
            </span>

            <strong>
              {formatCurrency(
                order.total_amount
              )}
            </strong>
          </div>
        </div>
      </div>
    </Modal>
  );
};

OrderDetails.propTypes = {
  isOpen:
    PropTypes.bool.isRequired,

  order:
    PropTypes.object,

  onClose:
    PropTypes.func
      .isRequired,
};

export default OrderDetails;