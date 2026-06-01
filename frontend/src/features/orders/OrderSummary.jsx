import PropTypes from "prop-types";

import {
  calculateOrderTotal,
} from "../../utils/helpers";

import {
  formatCurrency,
} from "../../utils/formatCurrency";

const OrderSummary = ({
  items = [],
}) => {
  const totalItems =
    items.length;

  const totalQuantity =
    items.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 0
        ),
      0
    );

  const grandTotal =
    calculateOrderTotal(
      items
    );

  return (
    <div className="order-summary">
      <h3 className="order-summary-title">
        Order Summary
      </h3>

      <div className="order-summary-row">
        <span>
          Products
        </span>

        <strong>
          {totalItems}
        </strong>
      </div>

      <div className="order-summary-row">
        <span>
          Quantity
        </span>

        <strong>
          {totalQuantity}
        </strong>
      </div>

      <div className="order-summary-divider" />

      <div className="order-summary-row order-summary-total">
        <span>
          Grand Total
        </span>

        <strong>
          {formatCurrency(
            grandTotal
          )}
        </strong>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  items:
    PropTypes.arrayOf(
      PropTypes.shape({
        product_id:
          PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
          ]),
        quantity:
          PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
          ]),
        unit_price:
          PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
          ]),
      })
    ),
};

export default OrderSummary;