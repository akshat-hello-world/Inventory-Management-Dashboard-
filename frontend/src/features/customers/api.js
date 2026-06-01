import { api } from "../../api/client";
import { ENDPOINTS } from "../../utils/constants";


// ==================================================
// Get All Customers
// ==================================================

export const getCustomers = async () => {
  return api.get(
    ENDPOINTS.CUSTOMERS
  );
};


// ==================================================
// Get Customer By ID
// ==================================================

export const getCustomer = async (
  customerId
) => {
  return api.get(
    ENDPOINTS.CUSTOMER_BY_ID(
      customerId
    )
  );
};


// ==================================================
// Create Customer
// ==================================================

export const createCustomer = async (
  payload
) => {
  return api.post(
    ENDPOINTS.CUSTOMERS,
    payload
  );
};


// ==================================================
// Update Customer
// ==================================================

export const updateCustomer = async (
  customerId,
  payload
) => {
  return api.put(
    ENDPOINTS.CUSTOMER_BY_ID(
      customerId
    ),
    payload
  );
};


// ==================================================
// Delete Customer
// ==================================================

export const deleteCustomer = async (
  customerId
) => {
  return api.delete(
    ENDPOINTS.CUSTOMER_BY_ID(
      customerId
    )
  );
};