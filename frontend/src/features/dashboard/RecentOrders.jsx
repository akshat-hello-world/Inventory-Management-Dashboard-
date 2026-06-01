import PropTypes from "prop-types";

import {
  formatCurrency,
} from "../../utils/formatCurrency";

import {
  formatRelativeTime,
} from "../../utils/formatDate";

const RecentOrders = ({
  orders = [],
}) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3>
          Recent Orders
        </h3>

        <span className="dashboard-card-count">
          {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="recent-orders-empty">
          No recent orders found.
        </div>
      ) : (
        <div className="recent-orders-list">
          {orders.map(
            (order) => (
              <div
                key={order.id}
                className="recent-order-item"
              >
                <div className="recent-order-left">
                  <div className="recent-order-id">
                    #{order.id}
                  </div>

                  <div className="recent-order-customer">
                    {order.customer
                      ?.full_name ??
                      "Unknown Customer"}
                  </div>

                  <div className="recent-order-time">
                    {formatRelativeTime(
                      order.created_at
                    )}
                  </div>
                </div>

                <div className="recent-order-right">
                  {formatCurrency(
                    order.total_amount
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

RecentOrders.propTypes = {
  orders:
    PropTypes.arrayOf(
      PropTypes.shape({
        id:
          PropTypes.number,
        total_amount:
          PropTypes.number,
        created_at:
          PropTypes.string,
        customer:
          PropTypes.shape({
            full_name:
              PropTypes.string,
          }),
      })
    ),
};

export default RecentOrders;