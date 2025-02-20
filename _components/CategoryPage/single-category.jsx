"use client";
import { useCategory } from "@/_hooks/ecommerce.hooks";
import Link from "next/link";

export const SingleCategory = ({ slug, path }) => {
  const { data: singleCategory } = useCategory({ slug });

  return (
    <div className="mt-[30px] flex flex-col items-center justify-center md:mt-[60px]">
      <div className="flex flex-row  items-center justify-center">
        <h1 className="font-sans text-[1.612rem] font-bold">
          {singleCategory?.basic_data?.name ?? ""}
        </h1>
      </div>
      <h3
        className="mt-5 max-w-[52.075rem] text-center font-sans text-[1.063rem]"
        dangerouslySetInnerHTML={{
          __html: singleCategory?.basic_data?.short_description,
        }}
      ></h3>
    </div>
  );
};
