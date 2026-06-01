// ==================================================
// API
// ==================================================

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL  ||
  (import.meta.env.DEV
    ? "/api/v1"
    : "http://localhost:8000/api/v1");


// ==================================================
// Routes
// ==================================================

export const ROUTES = {
  DASHBOARD: "/",
  PRODUCTS: "/products",
  CUSTOMERS: "/customers",
  ORDERS: "/orders",
};


// ==================================================
// API Endpoints
// ==================================================

export const ENDPOINTS = {
  DASHBOARD: "/dashboard",

  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,

  CUSTOMERS: "/customers",
  CUSTOMER_BY_ID: (id) => `/customers/${id}`,

  ORDERS: "/orders",
  ORDER_BY_ID: (id) => `/orders/${id}`,
};


// ==================================================
// Dashboard
// ==================================================

export const DASHBOARD_STATS = {
  TOTAL_PRODUCTS: "total_products",
  TOTAL_CUSTOMERS: "total_customers",
  TOTAL_ORDERS: "total_orders",
};


// ==================================================
// Inventory
// ==================================================

export const LOW_STOCK_THRESHOLD = 10;


// ==================================================
// Order Status
// ==================================================

export const ORDER_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};


// ==================================================
// Table Defaults
// ==================================================

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  10,
  25,
  50,
  100,
];


// ==================================================
// Toast Messages
// ==================================================

export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: "Product created successfully.",
  PRODUCT_UPDATED: "Product updated successfully.",
  PRODUCT_DELETED: "Product deleted successfully.",

  CUSTOMER_CREATED: "Customer created successfully.",
  CUSTOMER_UPDATED: "Customer updated successfully.",
  CUSTOMER_DELETED: "Customer deleted successfully.",

  ORDER_CREATED: "Order created successfully.",
  ORDER_DELETED: "Order deleted successfully.",
};


export const ERROR_MESSAGES = {
  GENERIC:
    "Something went wrong. Please try again.",

  NETWORK:
    "Unable to connect to the server.",

  VALIDATION:
    "Please check your input and try again.",
};


// ==================================================
// UI
// ==================================================

export const MODAL_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
};


export const STATUS_COLORS = {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  INFO: "info",
};
