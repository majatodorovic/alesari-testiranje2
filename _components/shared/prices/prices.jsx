import {
  checkIsInStock,
  checkPrices,
  getPriceStatus,
  renderDefaultPrices,
  renderDiscountPrices,
} from "./functions";

export const Prices = ({ price, inventory }) => {
  let status = getPriceStatus(price);
  let is_in_stock = checkIsInStock(inventory);
  let prices = checkPrices(price);

  let data = {
    status: status,
    is_in_stock: is_in_stock,
    price_defined: prices?.price_defined,
    is_price_range: prices?.price_range,
    price: price,
  };

  if (!data?.is_in_stock || !data.price_defined) {
    return <p className={`font-sans text-base`}>Send an inquiry</p>;
  }

  switch (data?.status) {
    case "default":
      return renderDefaultPrices({ ...data });
    case "discount":
      return renderDiscountPrices({ ...data });
  }
};
