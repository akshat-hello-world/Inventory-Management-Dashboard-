import StatsCards from "./StatsCards";
import LowStockTable from "./LowStockTable";
import RecentOrders from "./RecentOrders";

import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

import dashboardBanner from "../../assets/dashboard-operations.png";

import useFetch from "../../hooks/useFetch";

import {
  getDashboardData,
} from "./api";

const Dashboard = () => {
  const {
    data: dashboard,
    loading,
    error,
  } = useFetch(
    getDashboardData
  );

  if (loading) {
    return (
      <Loader
        size="lg"
        label="Loading dashboard..."
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Unable to Load Dashboard"
        description={error}
      />
    );
  }

  if (!dashboard) {
    return (
      <EmptyState
        title="No Dashboard Data"
        description="No dashboard information is currently available."
      />
    );
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-banner">
        <img
          src={dashboardBanner}
          alt="Inventory Dashboard"
        />
      </div>

      <StatsCards
        stats={
          dashboard.stats
        }
      />

      <div className="dashboard-grid">
        <div className="dashboard-grid-main">
          <LowStockTable
            products={
              dashboard.low_stock_products ??
              []
            }
          />
        </div>

        <div className="dashboard-grid-side">
          <RecentOrders
            orders={
              dashboard.recent_orders ??
              []
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
