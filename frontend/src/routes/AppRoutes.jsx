import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../features/dashboard/Dashboard";
import Products from "../features/products/Products";
import Customers from "../features/customers/Customers";
import Orders from "../features/orders/Orders";

import {
  ROUTES,
} from "../utils/constants";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route
            path={ROUTES.DASHBOARD}
            element={<Dashboard />}
          />

          <Route
            path={ROUTES.PRODUCTS}
            element={<Products />}
          />

          <Route
            path={ROUTES.CUSTOMERS}
            element={<Customers />}
          />

          <Route
            path={ROUTES.ORDERS}
            element={<Orders />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to={ROUTES.DASHBOARD}
                replace
              />
            }
          />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;