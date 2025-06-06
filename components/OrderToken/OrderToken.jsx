import { OrderItemsInfo, OrderPaymentInfo } from "@/_components/order";
import { notFound } from "next/navigation";

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
  } else return notFound();
};

export default OrderSuccess;
