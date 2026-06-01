import PropTypes from "prop-types";
import {
  Package,
  Users,
  ShoppingCart,
  IndianRupee,
} from "lucide-react";

import {
  formatCompactCurrency,
} from "../../utils/formatCurrency";

const StatsCards = ({
  stats,
}) => {
  const cards = [
    {
      title: "Products",
      value:
        stats.total_products,
      icon: Package,
      className:
        "stats-card--blue",
    },

    {
      title: "Customers",
      value:
        stats.total_customers,
      icon: Users,
      className:
        "stats-card--green",
    },

    {
      title: "Orders",
      value:
        stats.total_orders,
      icon: ShoppingCart,
      className:
        "stats-card--purple",
    },

    {
      title:
        "Inventory Value",
      value:
        formatCompactCurrency(
          stats.inventory_value
        ),
      icon: IndianRupee,
      className:
        "stats-card--orange",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map(
        (card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={
                card.title
              }
              className={`stats-card ${card.className}`}
            >
              <div className="stats-card-header">
                <span className="stats-card-title">
                  {
                    card.title
                  }
                </span>

                <div className="stats-card-icon">
                  <Icon
                    size={
                      20
                    }
                  />
                </div>
              </div>

              <h2 className="stats-card-value">
                {
                  card.value
                }
              </h2>
            </div>
          );
        }
      )}
    </div>
  );
};

StatsCards.propTypes = {
  stats:
    PropTypes.shape({
      total_products:
        PropTypes.number
          .isRequired,

      total_customers:
        PropTypes.number
          .isRequired,

      total_orders:
        PropTypes.number
          .isRequired,

      inventory_value:
        PropTypes.number
          .isRequired,
    }).isRequired,
};

export default StatsCards;
