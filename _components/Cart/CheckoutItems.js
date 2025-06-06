"use client";

import Image from "next/image";
import { useRemoveFromCart } from "@/_hooks/ecommerce.hooks";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/_helpers/functions";
import Link from "next/link";
import { Button } from "@/_components/shared/ui/button";

const CheckoutItems = ({
  id,
  name,
  sku,
  price,
  image,
  slug_path,
  inventory,
  className,
  key,
  refreshCart,
  quantity,
  refreshSummary,
  isClosed,
  cart_item_id,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate: removeFromCart, isSuccess } = useRemoveFromCart();

  useEffect(() => {
    if (isSuccess) {
      refreshCart();
    }
  }, [isSuccess]);

  const [productQuantity, setProductQuantity] = useState(Number(quantity));

  useEffect(() => {
    setProductQuantity(1);
  }, [quantity]);

  return (
    <>
      <div
        key={key}
        className={`relative grid grid-cols-7 gap-1 md:place-items-center md:gap-5`}
      >
   <Link href={`/${slug_path}`} className="col-span-7 md:col-span-3">
  {/* Mobilna verzija slike */}
  <div className="relative w-[100px] h-[100px] block md:hidden">
    <Image
      src={image?.[0] ?? "/comr.png"}
      alt={'Comr'} 
      fill
      className="object-contain"
    />
  </div>

  {/* Verzija za tablet i desktop */}
  <Image
    src={image?.[0] ?? "/comr.png"}
    alt={'Comr'} 
    width={0}
    height={0}
    sizes="100vw"
    className="hidden h-auto w-full md:block"
  />
</Link>

        <div
          className={`relative col-span-7 ml-2 flex flex-col items-start gap-1 md:col-span-4 md:ml-[2rem] md:gap-2`}
        >
          <div
            className={` absolute -top-4 right-2 z-10 cursor-pointer md:-top-5 ${
              isClosed && !inventory?.inventory_defined && "text-black"
            } text-lg hover:text-red-500`}
            onClick={() => {
              setOpenModal(true);
              // removeFromCart({ id: id });
            }}
          >
            <Image src="/icons/close.png" width={16} height={16} alt="" />
          </div>
          <h4 className={`${className} mt-2 text-[22px] font-normal`}>
            {name}
          </h4>
          <p
            className={`text-center ${className} text-[18px] font-medium md:mt-3`}
          >
            Total:&nbsp;
            {currencyFormat(
              productQuantity * price?.per_item?.total,
              price?.currency,
            )}
          </p>
        </div>
        {isClosed && !inventory?.inventory_defined && (
          <div
            className={`absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black/40`}
          ></div>
        )}
      </div>
      <div
        onClick={() => setOpenModal(false)}
        className={
          openModal
            ? `fixed inset-0 z-[3000] flex h-screen w-screen bg-black/40`
            : `hidden`
        }
      />
      <div
        className={
          openModal
            ? `visible fixed inset-0 z-[3100] m-auto h-fit w-full max-w-[40rem] translate-y-0 scale-100 space-y-5 bg-white p-10 !font-sans opacity-100 transition-all duration-500 max-sm:w-[95%]`
            : `invisible fixed inset-0 z-[3100] m-auto h-fit w-full max-w-[40rem] translate-y-20 scale-90 space-y-5 bg-white p-10 !font-sans opacity-0 transition-all duration-500 max-sm:w-[95%]`
        }
      >
        <p className={`text-center text-[1.2rem]`}>
          Are you sure you want to remove this item from your bag?
        </p>
        <div className={`mt-5 flex justify-center gap-5`}>
          <Button
            className={`!text-[1.2rem]`}
            onClick={() => {
              removeFromCart({ id: id });
              setOpenModal(false);
            }}
          >
            Yes
          </Button>
          <Button
            className={`!text-[1.2rem]`}
            onClick={() => setOpenModal(false)}
          >
            No
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutItems;
