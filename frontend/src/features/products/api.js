import { api } from "../../api/client";
import { ENDPOINTS } from "../../utils/constants";


// ==================================================
// Get All Products
// ==================================================

export const getProducts = async () => {
  return api.get(
    ENDPOINTS.PRODUCTS
  );
};


// ==================================================
// Get Product By ID
// ==================================================

export const getProduct = async (
  productId
) => {
  return api.get(
    ENDPOINTS.PRODUCT_BY_ID(
      productId
    )
  );
};


// ==================================================
// Create Product
// ==================================================

export const createProduct = async (
  payload
) => {
  return api.post(
    ENDPOINTS.PRODUCTS,
    payload
  );
};


// ==================================================
// Update Product
// ==================================================

export const updateProduct = async (
  productId,
  payload
) => {
  return api.put(
    ENDPOINTS.PRODUCT_BY_ID(
      productId
    ),
    payload
  );
};


// ==================================================
// Delete Product
// ==================================================

export const deleteProduct = async (
  productId
) => {
  return api.delete(
    ENDPOINTS.PRODUCT_BY_ID(
      productId
    )
  );
};