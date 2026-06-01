// ==================================================
// Object Helpers
// ==================================================

export const isEmptyObject = (value) => {
  return (
    value &&
    Object.keys(value).length === 0 &&
    value.constructor === Object
  );
};

export const removeEmptyFields = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );
};


// ==================================================
// Array Helpers
// ==================================================

export const uniqueByKey = (
  array,
  key
) => {
  const seen = new Set();

  return array.filter((item) => {
    const value = item[key];

    if (seen.has(value)) {
      return false;
    }

    seen.add(value);

    return true;
  });
};

export const sortByKey = (
  array,
  key,
  direction = "asc"
) => {
  return [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (direction === "desc") {
      return valueA < valueB ? 1 : -1;
    }

    return valueA > valueB ? 1 : -1;
  });
};


// ==================================================
// Search Helpers
// ==================================================

export const searchByFields = (
  items,
  searchTerm,
  fields = []
) => {
  if (!searchTerm?.trim()) {
    return items;
  }

  const query = searchTerm.toLowerCase();

  return items.filter((item) =>
    fields.some((field) =>
      String(item[field] || "")
        .toLowerCase()
        .includes(query)
    )
  );
};


// ==================================================
// Inventory Helpers
// ==================================================

export const isLowStock = (
  stockQuantity,
  threshold = 10
) => {
  return stockQuantity <= threshold;
};

export const getStockStatus = (
  stockQuantity,
  threshold = 10
) => {
  if (stockQuantity === 0) {
    return "Out of Stock";
  }

  if (stockQuantity <= threshold) {
    return "Low Stock";
  }

  return "In Stock";
};


// ==================================================
// Order Helpers
// ==================================================

export const calculateLineTotal = (
  quantity,
  unitPrice
) => {
  return Number(quantity) * Number(unitPrice);
};

export const calculateOrderTotal = (
  items = []
) => {
  return items.reduce(
    (total, item) =>
      total +
      calculateLineTotal(
        item.quantity,
        item.unit_price ??
          item.unitPrice ??
          0
      ),
    0
  );
};


// ==================================================
// String Helpers
// ==================================================

export const truncateText = (
  text,
  maxLength = 50
) => {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};

export const capitalize = (value) => {
  if (!value) {
    return "";
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};


// ==================================================
// Number Helpers
// ==================================================

export const safeNumber = (
  value,
  fallback = 0
) => {
  const number = Number(value);

  return Number.isNaN(number)
    ? fallback
    : number;
};