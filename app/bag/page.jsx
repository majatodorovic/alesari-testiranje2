import CheckoutPage from "@/_components/CheckoutPage/CheckoutPage";
import { get } from "@/_api/api";
import { Suspense } from "react";
import { cache } from "react";

const paymentOptions = cache(async () => {
  return await get("/checkout/payment-options").then(
    (response) => response?.payload,
  );
});
const deliveryOptions = cache(async () => {
  return await get("/checkout/delivery-options").then(
    (response) => response?.payload,
  );
});

const getCountries = cache(async () => {
  return await get(`/checkout/ddl/id_country`).then((res) => res?.payload);
});

export const metadata = () => {
  return {
    title: "Shopping Bag | Alesari",
  };
};

const Cart = async () => {
  const [paymentoptions, deliveryoptions, countries] = await Promise.all([
    paymentOptions(),
    deliveryOptions(),
    getCountries(),
  ]);

  return (
    <Suspense
      fallback={
        <div className={`container mx-auto px-2 xl:px-[2rem] 3xl:px-[5rem]`}>
          <div className={`h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
        </div>
      }
    >
      <CheckoutPage
        paymentoptions={paymentoptions}
        deliveryoptions={deliveryoptions}
        countries={countries}
      />
    </Suspense>
  );
};

export default Cart;

export const revalidate = 30;
