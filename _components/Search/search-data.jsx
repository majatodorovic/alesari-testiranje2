"use client";

import { useSearch } from "@/_hooks/ecommerce.hooks";
import { Suspense } from "react";
import { Thumb } from "@/_components/Thumb/Thumb";

export const SearchData = ({ search }) => {
  const { data: products } = useSearch({
    searchTerm: search,
    isSearchPage: true,
    render: false,
    limit: -1,
  });

  return (
    <>
      <div
        className={`px-[1.2rem] mt-5 lg:mt-20 ${products?.items?.length === 0 && "!px-0"}`}
      >
        <div
          className={`mt-[1.875rem] grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}
        >
          {products?.items?.length > 0 ? (
            products?.items?.map(({ id }) => {
              return (
                <Suspense
                  key={id}
                  fallback={
                    <div
                      className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                    />
                  }
                >
                  <Thumb id={id} key={id} categoryId={"*"} />
                </Suspense>
              );
            })
          ) : (
            <div
              className={`container mx-auto flex flex-col gap-2 px-2 xl:px-[2rem] 3xl:px-[5rem]`}
            >
              <h2 className={`font-sans text-[1.7rem]`}>
                No results found for{" "}
                <span className={`active-selected`}>{search}</span>
              </h2>
              <p className={`mt-3 font-sans text-[1.1rem]`}>
                Please try a different search term or browse our categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchData;
