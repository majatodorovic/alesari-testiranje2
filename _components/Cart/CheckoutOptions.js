import CheckoutTotals from "@/_components/Cart/CheckoutTotals";
import { useCheckout } from "@/_hooks/ecommerce.hooks";
import Spinner from "@/_components/UI/Spinner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { icons } from "@/lib/icons/icons";

const CheckoutOptions = ({
  formData,
  setFormData,
  className,
  paymentoptions,
  deliveryoptions,
  options,
  summary,
  totals,
  errors,
  setErrors,
}) => {
  const [openDeliveryInfo, setOpenDeliveryInfo] = useState(false);
  return (
    <>
      <div className={`col-span-2 lg:col-span-1`}>
        <div className={`flex flex-col gap-5`}>
          <div className={`flex items-center gap-2`}>
            <h3
              className={`my-[1rem] block  text-[26px]  font-thin ${
                errors?.includes("delivery_method") ? `text-red-500` : ``
              }`}
            >
              Your delivery details
            </h3>
            <span
              onClick={() => {
                setOpenDeliveryInfo(!openDeliveryInfo);
              }}
              className={`cursor-pointer hover:text-primary`}
            >
              {icons.info_circle}
            </span>
          </div>

          <div className={`bg-[#f7f7f7] px-[2rem] py-[3.3rem]`}>
            {deliveryoptions?.map(({ id, name }) => {
              return (
                <div className={`flex items-center gap-3 pl-2.5`} key={id}>
                  <input
                    type={`radio`}
                    className={`cursor-pointer  bg-black text-black focus:text-black focus:outline-none focus:ring-0`}
                    name={`delivery_method`}
                    id={`delivery_method_${id}`}
                    value={id}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        delivery_method: e.target.value,
                      });
                      setErrors(
                        errors?.filter((error) => error !== "delivery_method"),
                      );
                    }}
                  />
                  <label
                    htmlFor={`delivery_method_${id}`}
                    className={`cursor-pointer text-[20px] font-light ${className}`}
                  >
                    {name}
                  </label>
                </div>
              );
            })}
          </div>
          <h3
            className={`my-[1rem] block  text-[26px]  font-thin ${
              errors?.includes("payment_method") ? `text-red-500` : ``
            }`}
          >
            Your payment details
          </h3>
          <div className={`bg-[#f7f7f7] px-[2rem] py-[3.3rem]`}>
            {paymentoptions?.map(({ id, name, type }) => {
              return (
                <div className={`flex items-center gap-3 pl-2.5`} key={id}>
                  <input
                    type={`radio`}
                    className={`cursor-pointer bg-black text-black focus:text-black focus:outline-none focus:ring-0`}
                    name={`payment_method`}
                    id={`payment_method_${id}`}
                    value={id}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        payment_method: e.target.value,
                      });
                      setErrors(
                        errors?.filter((error) => error !== "payment_method"),
                      );
                    }}
                  />
                  <label
                    htmlFor={`payment_method_${id}`}
                    className={`cursor-pointer text-[20px] font-light ${className}`}
                  >
                    {name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        onClick={() => setOpenDeliveryInfo(false)}
        className={
          openDeliveryInfo
            ? `fixed inset-0 z-[3000] flex h-screen w-screen bg-black/40`
            : `hidden`
        }
      />
      <div
        className={
          openDeliveryInfo
            ? `visible fixed inset-0 z-[3100] m-auto h-fit w-full max-w-[40rem] translate-y-0 scale-100 space-y-5 bg-white p-10 !font-sans opacity-100 transition-all duration-500 max-sm:w-[95%]`
            : `invisible fixed inset-0 z-[3100] m-auto h-fit w-full max-w-[40rem] translate-y-20 scale-90 space-y-5 bg-white p-10 !font-sans opacity-0 transition-all duration-500 max-sm:w-[95%]`
        }
      >
        <p className={`text-[1.2rem]`}>
          At Alesari, we believe that the anticipation of receiving your
          meticulously handcrafted pair of shoes is part of the luxury
          experience.
        </p>
        <p className={`text-[1.2rem]`}>
          Once your package is ready to be shipped, you will receive an email
          notification prompting you to expect the delivery within the next 7
          days, depending on your address and shipping preferences. Please note
          that delivery is at our cost.
        </p>
        <p className={`text-[1.2rem]`}>
          We partner with DHL, a trusted courier service, to ensure that your
          package arrives safely and swiftly to your doorstep, wherever you are
          in the world.
        </p>
        <p className={`text-[1.2rem]`}>
          Thank you for your patience and for choosing Alesari for your luxury
          footwear needs.
        </p>
      </div>
    </>
  );
};

export default CheckoutOptions;
