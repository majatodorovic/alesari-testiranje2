"use client";

import { useWishlist } from "@/_hooks/ecommerce.hooks";
import { Suspense } from "react";
import { Thumb } from "@/_components/Thumb/Thumb";
import Link from "next/link";
import { Button } from "@/_components/shared/ui/button";

export const WishlistData = () => {
  const { data: products, refetch, isFetching } = useWishlist();

  if (products?.length === 0 && !isFetching) {
    return (
      <>
        <div className="nocontent-holder col-span-1 mx-auto mt-[1.2rem] flex items-center justify-center font-sans max-md:w-[95%] sm:col-span-2 md:col-span-3 xl:col-span-4">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-[#f8f8f8] p-10 text-center">
            <div className="text-center">
              <span className="text-2xl font-medium">Your wishlist</span>
            </div>
            <div className="mt-6 text-center text-lg font-medium">
              No items currently in your wishlist.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={`mt-5 px-[1.2rem] lg:mt-20`}>
      <div
        className={`mt-[1.875rem] grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}
      >
        {products?.map(({ id_product: id }) => {
          return (
            <Suspense
              key={id}
              fallback={
                <div
                  className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                />
              }
            >
              <Thumb
                id={id}
                key={id}
                categoryId={"*"}
                refreshWishlist={refetch}
              />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};
