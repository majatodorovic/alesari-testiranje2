"use client";

import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useProduct,
  useRemoveFromWishlist,
} from "@/_hooks/ecommerce.hooks";
import Variants from "@/_components/Product/ProductData/Variants";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  checkIsInStock,
  checkPrices,
  Prices,
} from "@/_components/shared/prices";
import { Tabs } from "@/_components/Product/ProductData/tabs";
import Wishlist from "@/public/icons/heart.png";
import WishlistActive from "@/public/icons/heart-active.png";
import ProductDataLoader from "@/_components/Product/ProductData/ProductDataLoader";

const ProductData = ({ className, slug = "" }) => {
  //fetchujemo podatke o proizvodu
  const { data: product, isLoading: isFetching } = useProduct({ slug });

  //modal za varijacije
  const [openModal, setOpenModal] = useState({
    open: false,
    type: "",
    item: {},
  });

  // //fetchujemo podatke o specifikacijama
  // const {} = useProductSpecification({ slug });

  //koristimo hookove za dodavanje u korpu i wishlist
  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: addToWishlist, isSuccess: isAdded } = useAddToWishlist();
  const { data, refetch: refetchIsInWishlist } = useIsInWishlist({
    id: product?.data?.item?.basic_data?.id_product,
  });

  const wishlist_data = {
    exist: data?.exist,
    wishlist_item_id: data?.wishlist_item_id,
  };

  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();

  //koristimo state za varijantu i novi url
  const [productVariant, setProductVariant] = useState();
  const [newURL, setNewURL] = useState();

  //setujemo novi url kad se promeni varijanta
  const handleURLChange = (url) => {
    setNewURL(url);
  };

  const router = useRouter();

  useEffect(() => {
    if (productVariant?.id && newURL) {
      window.history.replaceState({}, "", newURL);
    }
  }, [productVariant]);

  const checkIsAddable = (price, inventory) => {
    let addable_data = {};

    let is_in_stock = checkIsInStock(inventory);
    let { price_defined } = checkPrices(price);
    if (is_in_stock && price_defined) {
      addable_data.addable = true;
      addable_data.text = "ADD TO BAG";
    } else {
      addable_data.addable = false;
      addable_data.text = "SEND AN INQUIRY";
    }

    return addable_data;
  };

  //hendlujemo dodavanje u korpu
  const handleAddToCart = () => {
    switch (product?.product_type) {
      case "single":
        let is_addable = checkIsAddable(
          product?.data?.item?.price,
          product?.data?.item?.inventory,
        );
        if (is_addable?.addable) {
          addToCart({
            id: product?.data?.item?.basic_data?.id_product,
            quantity: 1,
          });
        } else {
          router.push(`/contact-us?slug=${slug}`);
        }
        break;
      case "variant":
        if (productVariant?.id) {
          let is_addable = checkIsAddable(
            productVariant?.price,
            productVariant?.inventory,
          );

          if (is_addable?.addable) {
            addToCart({
              id: productVariant?.id,
              quantity: 1,
            });
          } else {
            router.push(`/contact-us?slug=${productVariant?.slug}`);
          }
        } else {
          setOpenModal({
            open: true,
            type: "sizes",
            item: product?.data?.variant_options?.find((item) => {
              if (item?.attribute?.name?.includes("size")) {
                return item;
              }
            }),
          });
        }
        break;
      default:
        break;
    }
  };

  //azuriramo varijantu
  const updateProductVariant = (variant) => {
    setProductVariant({
      ...variant,
      price: {
        ...variant?.price,
        min: [],
        max: [],
      },
    });
  };

  //radimo refetch kad se doda u wishlist ili izbrise
  useEffect(() => {
    refetchIsInWishlist();
  }, [isAdded, isRemoved]);

  //pratimo selektovanu boju
  const [color, setColor] = useState();

  if (isFetching) {
    return <ProductDataLoader />;
  } else {
    return (
      <>
        <div className={`col-span-4  lg:col-span-2 ${className}`}>
          <div
            className={`flex flex-row border-b border-[#f4f2f0] p-[1rem] max-md:flex-col md:items-center md:justify-between`}
          >
            <div className="flex items-center justify-between max-md:w-full md:w-[30%]">
              <h1 className={`text-left font-sans text-[22px] font-normal`}>
                {product?.data?.item?.basic_data?.name}
              </h1>
              <div
                onClick={() => {
                  if (!wishlist_data?.exist) {
                    addToWishlist({
                      id: product?.data?.item?.basic_data?.id_product,
                      name: product?.data?.item?.basic_data?.name,
                    });
                  } else {
                    removeFromWishlist({ id: wishlist_data?.wishlist_item_id });
                  }
                }}
                className={`group cursor-pointer rounded-full p-1`}
              >
                {!wishlist_data?.exist ? (
                  <>
                    <Image
                      src={Wishlist}
                      alt="wishlist"
                      width={25}
                      height={25}
                      className={`${
                        wishlist_data?.exist && "!hidden "
                      } block group-hover:hidden`}
                    />
                    <Image
                      src={WishlistActive}
                      alt="wishlist"
                      width={25}
                      height={25}
                      className={`${
                        wishlist_data?.exist && "!block"
                      } hidden group-hover:block`}
                    />
                  </>
                ) : (
                  <Image
                    src={WishlistActive}
                    alt="wishlist"
                    width={25}
                    height={25}
                    className={`${
                      wishlist_data?.exist && "!block"
                    } hidden group-hover:block`}
                  />
                )}
              </div>
            </div>
            <div
              className={` flex flex-col gap-[1rem] sm:flex-row sm:gap-[4rem]`}
            >
              <Variants
                slug={slug}
                handleURLChange={handleURLChange}
                productVariant={productVariant}
                updateProductVariant={updateProductVariant}
                product={product}
                className={className}
                color={color}
                setSelectedColor={setColor}
                productSlug={slug}
                modal={{
                  openModal: openModal,
                  setOpenModal: setOpenModal,
                }}
              />
            </div>

            <div
              className={`flex flex-row gap-4 max-md:mt-[4rem] max-md:flex-col md:items-center`}
            >
              <Prices
                price={
                  productVariant?.id
                    ? productVariant?.price
                    : product?.data?.item?.price
                }
                inventory={
                  productVariant?.id
                    ? productVariant?.inventory
                    : product?.data?.item?.inventory
                }
              />

              <button
                disabled={isPending}
                onClick={handleAddToCart}
                className={`self-stretch max-md:!w-full ${className} text-[0.95rem] font-light ${
                  isPending && "!bg-white !text-black opacity-50"
                } border border-[#747579] !bg-black py-[1rem] text-center font-sans  text-[1rem] uppercase text-white transition-all duration-500 hover:!bg-white hover:!text-black disabled:opacity-50 md:!w-[280px]`}
              >
                {isPending
                  ? "ADDING.."
                  : checkIsAddable(
                      productVariant?.id
                        ? productVariant?.price
                        : product?.data?.item?.price,
                      productVariant?.id
                        ? productVariant?.inventory
                        : product?.data?.item?.inventory,
                    ).text}
              </button>
            </div>
          </div>
          <Suspense
            fallback={
              <>
                <div className={`h-10 w-full animate-pulse bg-slate-300`}></div>
                <div
                  className={`mt-5 h-10 w-full animate-pulse bg-slate-300`}
                ></div>
                <div
                  className={`mt-5 h-10 w-full animate-pulse bg-slate-300`}
                ></div>
                <div
                  className={`mt-5 h-32 w-full animate-pulse bg-slate-300`}
                ></div>
              </>
            }
          >
            <Tabs
              data={{
                name: product?.data?.item?.basic_data?.name,
                sku: product?.data?.item?.basic_data?.sku,
                productVariant,
                slug,
              }}
            />
          </Suspense>
        </div>
      </>
    );
  }
};

export default ProductData;
