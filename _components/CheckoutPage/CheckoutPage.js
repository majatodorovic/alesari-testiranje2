"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CheckoutData from "@/_components/Cart/CheckoutData";
import { useCartContext } from "@/_api/cartContext";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useCart, useSummary } from "@/_hooks/ecommerce.hooks";
import { Button } from "@/_components/shared/ui/button";
import { Layout } from "@/_components/shared/ui/layout";

const CheckoutPage = ({
  paymentoptions,
  deliveryoptions,
  recommendedProducts,
  countries,
  className,
}) => {
  const [cart] = useCartContext();

  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

  const [formData, setFormData] = useState({
    customer_type_billing: "personal",
    first_name_shipping: "",
    last_name_shipping: "",
    phone_shipping: "",
    email_shipping: "",
    address_shipping: "",
    object_number_shipping: "",
    town_name_shipping: "",
    zip_code_shipping: "",
    id_country_shipping: "193",
    country_name_shipping: "Srbija",
    note_shipping: "",
    first_name_billing: "",
    last_name_billing: "",
    phone_billing: "",
    email_billing: "",
    address_billing: "",
    object_number_billing: "",
    town_name_billing: "",
    zip_code_billing: "",
    id_country_billing: "193",
    country_name_billing: "Srbija",
    note_billing: "",
    payment_method: "",
    delivery_method: "",
    note: "",
    gcaptcha: token,
    company_name_billing: null,
    pib_billing: null,
    maticni_broj_billing: null,
    floor_billing: null,
    apartment_number_billing: null,
    id_town_billing: null,
    id_municipality_billing: null,
    municipality_name_billing: null,
    id_company_shipping: null,
    id_company_address_shipping: null,
    company_name_shipping: null,
    pib_shipping: null,
    maticni_broj_shipping: null,
    floor_shipping: null,
    apartment_number_shipping: null,
    id_town_shipping: null,
    id_municipality_shipping: null,
    municipality_name_shipping: null,
    delivery_method_options: [],
    payment_method_options: [],
    promo_code: null,
    promo_code_options: [],
    accept_rules: false,
  });

  //fetchujemo sve artikle iz korpe
  const { data, refetch: refreshCart, isFetching } = useCart();

  //fetchujemo summary korpe (iznos,popuste,dostavu itd)
  const {
    data: {
      summary,
      summary: { options, totals },
    },
    refetch: refreshSummary,
  } = useSummary({
    items: data?.items?.map((item) => {
      return Number(item?.cart?.quantity);
    }),
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    refreshSummary();
  }, [cart]);

  const renderCart = () => {
    if (!isFetching && data?.items?.length > 0) {
      return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
          <GoogleReCaptcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
          <Layout className="placeholder mt-[1rem] text-sm md:px-[1rem] lg:mt-[4rem]">
            <>
              <div className="grid grid-cols-5 gap-x-3 gap-y-3 font-sans max-xl:mx-auto max-xl:w-[95%]">
                <div className="col-span-5 bg-white p-1 max-xl:row-start-1">
                  <h3 className="mb-[2rem] block text-[26px] font-thin hidden lg:block">
                    Your shipping information
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                    className={`grid grid-cols-6 gap-[3.75rem]`}
                  >
                    <CheckoutData
                      setFormData={setFormData}
                      formData={formData}
                      className={className}
                      deliveryoptions={deliveryoptions}
                      paymentoptions={paymentoptions}
                      items={data?.items}
                      refreshSummary={refreshSummary}
                      summary={summary}
                      options={options}
                      totals={totals}
                      refreshCart={refreshCart}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </form>
                </div>
              </div>
            </>
            {loading && (
              <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40">
                <div className="flex flex-col items-center justify-center gap-3">
                  <h1 className="text-xl text-white ">
                    Your request is processing...
                  </h1>
                  <i className="fa-solid fa-spinner animate-spin text-6xl text-white"></i>
                </div>
              </div>
            )}
          </Layout>
        </GoogleReCaptchaProvider>
      );
    }

    if (!isFetching && data?.items?.length === 0) {
      return (
        <>
          <div className="nocontent-holder mx-auto mt-[1.2rem] flex items-center justify-center font-sans max-md:w-[95%] lg:mt-[13rem]">
            <div className="flex flex-col items-center justify-center rounded-3xl border border-[#f8f8f8] p-10 text-center">
              <div className="text-center">
                <span className="text-2xl font-medium">Your bag</span>
              </div>
              <div className="mt-6 text-center text-lg font-medium">
                No items currently in your bag.
              </div>
              <div className="mt-5 text-center">
                <Link href="/">
                  <Button>CONTINUE SHOPPING</Button>
                </Link>
              </div>
              <div className="help-container mt-10 text-center">
                <p className="font-medium">Need help? Here are some options:</p>
                <ul className="mt-2">
                  <li>
                    - If you need help, you can always contact us:{" "}
                    <a href={`mailto:info@alesari.com`}>info@alesari.com</a>.
                  </li>
                  <li>
                    -{" "}
                    <Link className={`active-selected`} href={`/how-to-buy`}>
                      See shopping guide.
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (isFetching) {
      return (
        <div className={`container mx-auto px-2 xl:px-[2rem] 3xl:px-[5rem]`}>
          <div className={`h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
          <div className={`mt-10 h-20 w-full animate-pulse bg-slate-300`} />
        </div>
      );
    }
  };

  return renderCart();
};

export default CheckoutPage;
