import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const pageTitles = {
  "/": {
    title: "Dashboard",
    subtitle:
      "Overview of inventory and orders",
  },

  "/products": {
    title: "Products",
    subtitle:
      "Manage inventory products",
  },

  "/customers": {
    title: "Customers",
    subtitle:
      "Manage customer records",
  },

  "/orders": {
    title: "Orders",
    subtitle:
      "Track and manage orders",
  },
};

const DashboardLayout = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const location = useLocation();

  const page =
    pageTitles[location.pathname] ??
    {
      title: "Inventory System",
      subtitle: "",
    };

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="dashboard-content">
        <Navbar
          title={page.title}
          subtitle={page.subtitle}
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;