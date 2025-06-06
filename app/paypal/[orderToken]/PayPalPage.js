"use client";

import PayPalWidget from "./PayPalWidget";
import { useSuspenseQuery } from "@tanstack/react-query";
import { post as POST } from "@/_api/api";

const PayPalPage = ({ token }) => {
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ["widget", token],
    queryFn: async () => {
      return await POST(
        `callback/checkout/paypal-widget?action=widget-options&order_id=${token}`,
      ).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });

  let paymentOption;
  if (data && data?.widget_options) {
    paymentOption = data?.widget_options?.funding_sources[0] ?? "";
  }

  return (
    <div className="mx-auto mt-[1rem] flex items-center justify-center px-[3%] text-sm 4xl:container lg:mt-[6rem]">
      {isFetching ? (
        <i className={`fas fa-spinner fa-spin text-2xl`} />
      ) : (
        <div
          className={`my-10 flex flex-col items-center justify-center bg-[#f7f7f7] px-10 py-10 md:px-[15rem]`}
        >
          {renderText(paymentOption)}
          <PayPalWidget
            token={token}
            receivedData={data?.widget_options ?? []}
          />
        </div>
      )}
    </div>
  );
};

export default PayPalPage;

const renderText = (funding_source) => {
  switch (funding_source) {
    case "paypal":
      return (
        <>
          <h2 className={`text-center text-[1.3rem] font-semibold`}>
            Pay with PayPal
          </h2>
          <p className={`mt-10 text-center`}>
            Please enter your PayPal details by clicking
            <br /> &quot;Pay with PayPal&quot; and complete the purchase
          </p>
        </>
      );
    case "card":
      return (
        <>
          <h2 className={`text-center text-[1.3rem] font-semibold`}>
            Pay with Credit Card
          </h2>
          <p className={`mt-10 text-center`}>
            Please enter your credit card details by clicking
            <br /> &quot;Debit or Credit Card&quot; and complete the purchase
          </p>
        </>
      );
    case "eps":
      return (
        <>
          <h2 className={`text-center text-[1.3rem] font-semibold`}>
            Pay with EPS
          </h2>
        </>
      );
    case "":
      return (
        <>
          <h2 className={`text-center text-[1.3rem] font-semibold`}>
            Payment options
          </h2>
          <p className={`mt-10 text-center`}>
            Please select your desired payment option
          </p>
        </>
      );
    default:
      return null;
  }
};
