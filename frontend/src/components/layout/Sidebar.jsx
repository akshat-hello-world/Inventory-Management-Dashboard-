import PropTypes from "prop-types";
import clsx from "clsx";
import logo from "../../assets/logo.svg";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  X,
} from "lucide-react";
import {
  NavLink,
} from "react-router-dom";

import {
  ROUTES,
} from "../../utils/constants";

const navigationItems = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: ROUTES.PRODUCTS,
    icon: Package,
  },
  {
    label: "Customers",
    path: ROUTES.CUSTOMERS,
    icon: Users,
  },
  {
    label: "Orders",
    path: ROUTES.ORDERS,
    icon: ShoppingCart,
  },
];

const Sidebar = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "sidebar",
          {
            "sidebar--open":
              isOpen,
          }
        )}
      >
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img
              src={logo}
              alt="Inventory Management"
              className="sidebar-logo"
            />

            <div>
              <h2>
                Inventory
              </h2>
              <span>
                Management
              </span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({
                    isActive,
                  }) =>
                    clsx(
                      "sidebar-link",
                      {
                        "sidebar-link--active":
                          isActive,
                      }
                    )
                  }
                >
                  <Icon
                    size={18}
                  />

                  <span>
                    {item.label}
                  </span>
                </NavLink>
              );
            }
          )}
        </nav>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
