import Box from "@mui/material/Box";
import { currencyFormat } from "@/_helpers/functions";
import Tooltip from "@mui/material/Tooltip";

/**
 * Returns status of the price
 * @param {object} price - The object that holds the price data.
 * @returns {string} - The status of the price.
 */
export const getPriceStatus = (price) => {
  let status = "default";

  if (price?.discount?.active && price?.rebate?.active) {
    status = "discount_rebates";
  }
  if (price?.discount?.active && !price?.rebate?.active) {
    status = "discount";
  }
  if (price?.rebate?.active && !price?.discount?.active) {
    status = "rebates";
  }

  return status;
};

/**
 * Returns are prices equal
 * @param {object} price - The object that holds the price data.
 * @returns {boolean} - Are prices equal.
 */
export const getArePricesEqual = (price) => {
  return price?.min?.price?.original === price?.max?.price?.original;
};

/**
 * Returns status of the inventory
 * @param {object} inventory - The object that holds the inventory data.
 * @returns {boolean} - The status of the inventory - is in stock or not.
 */
export const checkIsInStock = (inventory) => {
  return inventory?.inventory_defined && inventory?.amount > 0;
};

/**
 * Returns status of the inventory
 * @param {object} price - The object that holds the price data.
 * @returns {object} - The status of the price - is it defined and is it the range of prices.
 */
export const checkPrices = (price) => {
  let data = {};

  data.price_defined = !!(price?.price_defined && price?.price?.original > 0);

  data.price_range =
    price?.min?.price?.original > 0 && price?.max?.price?.original > 0;

  return data;
};

/**
 * Returns status of the inventory
 * @param {object} data - The object that holds the price data.
 * @returns {JSX.Element} - Default prices, without rebates or discounts.
 */
export const renderDefaultPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;

  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);
    if (are_range_prices_equal) {
      return (
        <p className={`mt-2 font-sans`}>
          {currencyFormat(price?.min?.price?.original, price?.currency)}
        </p>
      );
    } else {
      return (
        <p className={`mt-2 font-sans`}>
          {currencyFormat(price?.min?.price?.original, price?.currency)} -{" "}
          {currencyFormat(price?.max?.price?.original, price?.currency)}
        </p>
      );
    }
  } else {
    return (
      <p className={`mt-2 font-sans`}>
        {currencyFormat(price?.price?.original, price?.currency)}
      </p>
    );
  }
};

/**
 * Returns status of the inventory
 * @param {object} data - The object that holds the price data.
 * @returns {JSX.Element} - Prices after discount.
 */
export const renderDiscountPrices = (data = {}) => {
  let is_range = data?.is_price_range;
  let price = data?.price;

  if (is_range) {
    let are_range_prices_equal = getArePricesEqual(price);

    if (are_range_prices_equal) {
      return (
        <div
          className={`mt-2 flex flex-row flex-wrap items-center gap-3 font-sans`}
        >
          <p className={`font-bold`}>
            {currencyFormat(price?.min?.price?.discount, price?.currency)}
          </p>
          <p className={`line-through`}>
            {currencyFormat(price?.min?.price?.original, price?.currency)}
          </p>
        </div>
      );
    } else {
      return (
        <div
          className={`mt-2 flex flex-row flex-wrap items-center gap-3 font-sans`}
        >
          <p className={`font-bold`}>
            {currencyFormat(price?.min?.price?.discount, price?.currency)} -{" "}
            {currencyFormat(price?.max?.price?.discount, price?.currency)}
          </p>
          <p className={`line-through`}>
            {currencyFormat(price?.min?.price?.original, price?.currency)} -{" "}
            {currencyFormat(price?.max?.price?.original, price?.currency)}
          </p>
        </div>
      );
    }
  } else {
    return (
      <div
        className={`mt-2 flex flex-row flex-wrap items-center gap-3 font-sans`}
      >
        <p className={`font-bold`}>
          {currencyFormat(price?.price?.discount, price?.currency)}
        </p>
        <p className={`line-through`}>
          {currencyFormat(price?.price?.original, price?.currency)}
        </p>
      </div>
    );
  }
};
