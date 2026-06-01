import { api } from "../../api/client";
import { ENDPOINTS } from "../../utils/constants";


// ==================================================
// Get All Orders
// ==================================================

export const getOrders = async () => {
  return api.get(
    ENDPOINTS.ORDERS
  );
};


// ==================================================
// Get Order By ID
// ==================================================

export const getOrder = async (
  orderId
) => {
  return api.get(
    ENDPOINTS.ORDER_BY_ID(
      orderId
    )
  );
};


// ==================================================
// Create Order
// ==================================================

export const createOrder = async (
  payload
) => {
  return api.post(
    ENDPOINTS.ORDERS,
    payload
  );
};


// ==================================================
// Delete Order
// ==================================================

export const deleteOrder = async (
  orderId
) => {
  return api.delete(
    ENDPOINTS.ORDER_BY_ID(
      orderId
    )
  );
};