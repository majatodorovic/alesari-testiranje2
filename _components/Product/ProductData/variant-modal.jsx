import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import { SizeModal } from "@/_components/Product/ProductData/size-modal";
import Image from "next/image";
import { useState } from "react";

export const VariantModal = ({
  modal,
  onChangeHandler,
  handleVariantOptionChange,
  updateProductVariant,
  getProductVariant,
  handleURLChange,
  selected,
  setSelectedColor,
  product_slug,
  variant_product,
  className,
}) => {
  const [sizeModal, setSizeModal] = useState(false);

  return (
    <>
      <div
        className={
          modal?.openModal?.open
            ? `fixed bottom-0 right-0 top-0 z-[3000] h-dvh w-full translate-x-0 overflow-y-auto bg-white transition-all duration-500 md:w-[40%]`
            : `fixed bottom-0 right-0 top-0 z-[3000] h-dvh w-full translate-x-full overflow-y-auto bg-white transition-all duration-500 md:w-[40%]`
        }
      >
        <div
          className="cursor-pointer pr-5 text-right font-sans text-[26px]"
          onClick={() => {
            modal.setOpenModal({
              ...modal?.openModal,
              open: false,
            });
          }}
        >
          x
        </div>
        <div className={`p-5 md:px-20`}>
          {modal?.openModal?.item?.attribute?.name === "Colors" ? (
            <p className={`pb-10 font-sans text-[1.5rem] font-bold uppercase`}>
              Select color
            </p>
          ) : (
            <div className={`flex items-center pb-10`}>
              <p
                className={`mr-auto font-sans text-[1.5rem] font-bold uppercase`}
              >
                Select size
              </p>
              <p
                onClick={() => {
                  setSizeModal(true);
                }}
                className={`active-selected ml-auto cursor-pointer font-sans text-[1rem]`}
              >
                Size guide
              </p>
            </div>
          )}
          <form
            key={modal?.openModal?.item?.id}
            id={modal?.openModal?.item?.id}
            name={modal?.openModal?.item?.attribute?.key}
            className={`${
              modal?.openModal?.item?.attribute?.name === "Colors"
                ? `grid grid-cols-2 gap-[2rem]`
                : `mr-auto flex w-fit flex-col gap-[1.5rem] text-left max-md:px-0`
            }`}
          >
            {modal?.openModal?.item?.attribute?.name === "Colors"
              ? modal?.openModal?.item?.values?.map((value) => {
                  let display = value.display;
                  return (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onChangeHandler(
                          modal?.openModal?.item?.attribute?.key,
                          value?.key,
                        );
                        handleVariantOptionChange();
                        variant_product = getProductVariant();
                        if (variant_product) {
                          updateProductVariant(variant_product);

                          handleURLChange(variant_product?.slug);
                          product_slug = variant_product?.slug;
                        }
                        setSelectedColor(value.key);
                        modal.setOpenModal({
                          ...modal?.openModal,
                          open: false,
                        });
                      }}
                      key={value.id}
                      value={value.key}
                      selected={value.selected}
                      style={{ display: value.display }}
                      className={
                        display === "show"
                          ? `block rounded-full text-[0.875rem]`
                          : `opacity-50`
                      }
                      aria-label={value.name}
                    >
                      {value?.product_image && (
                        <div
                          className={`${
                            selected?.find(
                              (x) =>
                                x.attribute_key ===
                                  modal?.openModal?.item.attribute.key &&
                                x.value_key === value.key,
                            )
                              ? `border-2 border-slate-500`
                              : ``
                          } relative aspect-square hover:border-2 hover:border-black`}
                        >
                          {value?.product_image && (
                            <Image
                              src={convertHttpToHttps(value?.product_image)}
                              width={0}
                              height={0}
                              sizes={`90vw`}
                              alt={`Alesari`}
                              className="!h-auto !w-full"
                            />
                          )}
                        </div>
                      )}
                      <p className={`mr-auto text-left font-sans text-base`}>
                        {value?.name}
                      </p>
                    </button>
                  );
                })
              : modal?.openModal?.item?.values?.map((value) => {
                  let display = value.display;
                  return (
                    <button
                      key={value?.id}
                      value={value?.key}
                      disabled={display === "hide"}
                      selected={value.selected}
                      style={{ display: value.display }}
                      className={
                        display === "show"
                          ? `font-sans ${className} active-hover -mt-2 block rounded-full border border-transparent text-[1.313rem] ${
                              selected?.find(
                                (x) =>
                                  x.attribute_key ===
                                    modal?.openModal?.item.attribute.key &&
                                  x.value_key === value.key,
                              )
                                ? `${className} active-selected`
                                : `${className}`
                            }  py-0.5 ${
                              Number(value?.name) <= 9
                                ? "px-[0.7rem]"
                                : "px-[0.4rem]"
                            }`
                          : `${className} block  ${
                              Number(value?.name) <= 9
                                ? "px-[0.7rem]"
                                : "px-[0.4rem]"
                            } active-hover py-0.5 font-sans text-[1.313rem] !font-light text-black`
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        // setSize(value?.key);
                        onChangeHandler(
                          modal?.openModal?.item?.attribute?.key,
                          e.target.value,
                        );
                        handleVariantOptionChange();
                        variant_product = getProductVariant();
                        if (variant_product) {
                          updateProductVariant(variant_product);

                          handleURLChange(variant_product?.slug);
                          product_slug = variant_product?.slug;
                        } else {
                          updateProductVariant(null);
                        }
                        modal.setOpenModal({
                          ...modal?.openModal,
                          open: false,
                        });
                      }}
                    >
                      {value?.name}
                    </button>
                  );
                })}
          </form>
        </div>
      </div>

      <div
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setSizeModal(false);
          }
        }}
        className={
          sizeModal
            ? `visible fixed left-0 top-0 z-[3001] flex h-full w-full flex-col items-center justify-center bg-black/40 opacity-100 transition-all duration-500`
            : `transition-al invisible fixed left-0 top-0 z-[3001] flex h-full w-full flex-col items-center justify-center bg-black/40 opacity-0 duration-500`
        }
      >
        <SizeModal setSizeModal={setSizeModal} />
      </div>
    </>
  );
};
