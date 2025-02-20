"use client";
import { currencyFormat } from "@/_helpers/functions";
import { usePathname } from "next/navigation";

const ProductPrice = ({ price, inventory, className, handlePrice }) => {
  const pathname = usePathname();
  switch (true) {
    case price?.price_defined && inventory?.amount !== null:
      handlePrice ? handlePrice(price?.price?.original) : null;
      return (
        <div className={`flex items-center gap-3 font-thin`}>
          {price?.price?.discount !== null ? (
            <div className="group relative inline-block">
              <span className="invisible absolute -top-8 left-0 z-50 rounded bg-green-500 p-[6px] text-[10px] font-normal text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                Cena sa popustom
                <svg
                  className="absolute left-[45%] z-50 h-6 w-6 -translate-x-1/2 -translate-y-[2px] transform fill-current stroke-current text-green-500"
                  width="8"
                  height="8"
                >
                  <rect
                    x="12"
                    y="-10"
                    width="8"
                    height="8"
                    transform="rotate(45)"
                  />
                </svg>
              </span>
              <div className={`${className}`}>
                {currencyFormat(price?.price?.discount)}
              </div>
            </div>
          ) : (
            <div className={className}>
              {currencyFormat(price?.price?.original)}
            </div>
          )}
        </div>
      );

    case price?.price_defined && inventory?.amount === null:
      handlePrice ? handlePrice(price?.price?.original) : null;
      return (
        <>
          {price?.price?.discount !== null ? (
            <div className="group relative inline-block">
              <span className="invisible absolute -top-8 left-[15%] rounded bg-green-500 p-[6px] text-[10px] font-normal text-white opacity-0 transition group-hover:visible group-hover:opacity-100">
                Cena sa popustom
                <svg
                  className="absolute left-[45%] z-50 h-6 w-6 -translate-x-1/2 -translate-y-[2px] transform fill-current stroke-current text-green-500"
                  width="8"
                  height="8"
                >
                  <rect
                    x="12"
                    y="-10"
                    width="8"
                    height="8"
                    transform="rotate(45)"
                  />
                </svg>
              </span>
              <div className={`${className}`}>
                {currencyFormat(price?.price?.discount)}
              </div>
            </div>
          ) : (
            <>
              {" "}
              <div className={className}>
                {currencyFormat(price?.price?.original)}
              </div>
            </>
          )}
        </>
      );

    case !price?.price_defined && inventory?.amount !== null:
      handlePrice ? handlePrice("Cena na upit") : null;
      return <h1 className={className}>Cena na upit</h1>;

    case !price?.price_defined && inventory?.amount === null:
      handlePrice ? handlePrice("Cena na upit") : null;

      return <h1 className={className}>Cena na upit</h1>;

    default:
      return null;
  }
};

export default ProductPrice;
