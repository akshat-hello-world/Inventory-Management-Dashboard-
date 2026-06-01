import { api } from "../../api/client";
import { ENDPOINTS } from "../../utils/constants";


/**
 * Get dashboard analytics data.
 */
export const getDashboardData = async () => {
  return api.get(
    ENDPOINTS.DASHBOARD
  );
};