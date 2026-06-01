// ==================================================
// Currency Formatter
// ==================================================

const currencyFormatter = new Intl.NumberFormat(
  "en-IN",
  {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
);


/**
 * Format currency values.
 *
 * Examples:
 * formatCurrency(49999)
 * => ₹49,999.00
 *
 * formatCurrency("1499.5")
 * => ₹1,499.50
 */
export const formatCurrency = (
  amount
) => {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return currencyFormatter.format(0);
  }

  return currencyFormatter.format(value);
};


/**
 * Format currency without symbol.
 *
 * Example:
 * 49999
 * => 49,999.00
 */
export const formatCurrencyValue = (
  amount
) => {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return "0.00";
  }

  return new Intl.NumberFormat(
    "en-IN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(value);
};


/**
 * Format compact currency.
 *
 * Examples:
 * 120000
 * => ₹1.2L
 *
 * 2500000
 * => ₹25L
 */
export const formatCompactCurrency = (
  amount
) => {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return "₹0";
  }

  if (value >= 1_00_00_000) {
    return `₹${(
      value / 1_00_00_000
    ).toFixed(1)}Cr`;
  }

  if (value >= 1_00_000) {
    return `₹${(
      value / 1_00_000
    ).toFixed(1)}L`;
  }

  if (value >= 1_000) {
    return `₹${(
      value / 1_000
    ).toFixed(1)}K`;
  }

  return formatCurrency(value);
};