"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import Wishlist from "../../public/icons/heart.png";
import WishlistActive from "../../public/icons/heart-active.png";

import {
  useAddToCart,
  useAddToWishlist,
  useIsInWishlist,
  useProductThumb,
  useRemoveFromWishlist,
} from "@/_hooks/ecommerce.hooks";
import { Stickers } from "@/_components/shared/ui/stickers";
import { Prices } from "@/_components/shared/prices";

export const Thumb = ({ id, refreshWishlist = () => {}, categoryId = "*" }) => {
  const { data: product } = useProductThumb({
    id: id,
    categoryId: categoryId,
  });

  const { mutate: addToWishlist, isSuccess: isAdded } = useAddToWishlist();
  const { mutate: removeFromWishlist, isSuccess: isRemoved } =
    useRemoveFromWishlist();
  const { mutate: addToCart } = useAddToCart();

  const { data: wishlist_data, refetch } = useIsInWishlist({ id: id });

  useEffect(() => {
    refetch();
    refreshWishlist();
  }, [isAdded, isRemoved]);

  const isInWishlist = {
    exist: wishlist_data?.exist,
    wishlist_item_id: wishlist_data?.wishlist_item_id,
  };

  const has_stickers = product?.stickers?.length > 0;

  return (
    <div key={`product-thumb-${id}`} className="group relative col-span-1">
      <div className={`relative w-full`}>
        <Swiper
          modules={[Scrollbar]}
          scrollbar={{
            draggable: true,
          }}
          direction={"horizontal"}
          rewind
          className={`categoryImageSwiper relative`}
        >
          {(product?.image_data ?? [])?.map(
            (
              { url, descriptions: { alt }, file_data: { width, height } },
              index,
            ) => {
              return (
                <SwiperSlide
                  key={`product-image-${index}`}
                  className={`mr-[1px] !w-full pr-[3px]`}
                >
                  <Link href={`/${product?.link?.link_path}`}>
                    <Image
                      src={convertHttpToHttps(url)}
                      alt={alt ?? product?.basic_data?.name}
                      width={width ?? 0}
                      height={height ?? 0}
                      priority={true}
                      sizes={`100vw`}
                      className={`!w-full !object-cover`}
                    />
                  </Link>
                </SwiperSlide>
              );
            },
          )}
        </Swiper>

        {product?.price?.discount?.active && (
          <div
            className={`absolute bottom-5 left-2 z-[1] flex flex-col text-white`}
          >
            {(product?.price?.discount?.campaigns ?? [])?.map(
              ({ id, calc: { amount, original } }) => {
                let amount_num = Number(amount);
                let percentage = Math.round((amount_num / original) * 100);

                return (
                  <div
                    key={id}
                    className={`bg-black px-[0.85rem] py-1 font-sans text-sm font-bold`}
                  >
                    <span>- {percentage}%</span>
                  </div>
                );
              },
            )}
          </div>
        )}

        <div
          onClick={() => {
            if (!isInWishlist?.exist) {
              addToWishlist({ id: id, name: product?.basic_data?.name });
            } else {
              removeFromWishlist({ id: isInWishlist?.wishlist_item_id });
            }
          }}
          className={`group absolute right-3 top-3 z-[1] cursor-pointer rounded-full p-1 max-md:hidden`}
        >
          {!isInWishlist?.exist ? (
            <>
              <Image
                src={Wishlist}
                alt="wishlist"
                width={15}
                height={15}
                className={`${
                  isInWishlist?.exist && "!hidden "
                } block group-hover:hidden`}
              />
              <Image
                src={WishlistActive}
                alt="wishlist"
                width={15}
                height={15}
                className={`${
                  isInWishlist?.exist && "!block"
                } hidden group-hover:block`}
              />
            </>
          ) : (
            <Image
              src={WishlistActive}
              alt="wishlist"
              width={15}
              height={15}
              className={`${
                isInWishlist?.exist && "!block"
              } hidden group-hover:block`}
            />
          )}
        </div>

        {has_stickers && (
          <div className={`absolute left-2 top-2 z-[5] flex flex-col gap-2`}>
            {(product?.stickers ?? [])?.map(({ name }, i) => {
              return (
                <Stickers
                  key={i}
                  name={name}
                  className={`bg-black font-sans text-sm font-bold`}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="relative mt-[0.813rem] flex items-center justify-between">
        <Link
          href={`/${product?.link?.link_path}`}
          className="relative line-clamp-1 w-fit font-sans text-[1rem] font-bold group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 group-hover:after:h-[1px] group-hover:after:w-full group-hover:after:bg-black"
        >
          {product?.basic_data?.name}
        </Link>
      </div>
      <Prices price={product?.price} inventory={product?.inventory} />
    </div>
  );
};
