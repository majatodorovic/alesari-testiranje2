"use client";

import { OrderItemsInfo, OrderPaymentInfo } from "@/_components/order";

const OrderSuccess = ({ order }) => {
  if (order) {
    return (
      <div
        className={`mx-auto mt-[0rem] grid grid-cols-2 gap-x-10 font-sans md:w-[90%] md:divide-y md:divide-gray-200 lg:mt-[9rem]`}
      >
        <OrderPaymentInfo order={order} />
        <OrderItemsInfo order={order} />
      </div>
    );
  }
};

export default OrderSuccess;
