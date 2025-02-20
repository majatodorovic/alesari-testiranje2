"use client";

import { sortKeys } from "@/_helpers/const";
import { useEffect, useState } from "react";
import Filter from "./Filter";

const FiltersMobile = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  tempSelectedFilters,
  setTempSelectedFilters,
  setSort,
  sort,
  changeFilters,
  setChangeFilters,
  setFilterOpen,
  setLastSelectedFilterKey,
  setPage,
}) => {
  const [openIndex, setOpenIndex] = useState({
    key: null,
  });

  return (
    <>
      <div className="flex h-full flex-col px-[0.7rem] font-sans">
        <div
          className={`sticky top-0 flex w-full items-center justify-center border-b py-3 text-center`}
        >
          <p className="mx-auto self-center text-center text-[1.3rem] font-bold text-[#171717]">
            Filters
          </p>
          <i
            className={`fa fa-solid fa-times mr-3 cursor-pointer text-[1.34rem] text-[#171717] hover:text-red-500`}
            onClick={() => setFilterOpen(false)}
          ></i>
        </div>
        {availableFilters?.map((filter, index) => {
          const isOpen = openIndex.key === filter.key;
          return (
            <div key={index}>
              <div
                className="mx-auto flex w-[95%] cursor-pointer select-none items-center justify-between border-b border-b-[#f5f5f5] py-[1.375rem]"
                onClick={() =>
                  setOpenIndex({
                    key: openIndex?.key === filter?.key ? null : filter?.key,
                  })
                }
                key={filter?.key}
              >
                <p className="text-[1rem] font-bold">
                  {filter?.attribute?.name === "Cena"
                    ? "Price"
                    : filter?.attribute?.name}
                </p>
                <div>
                  <p className={`text-[1.2rem] font-light text-[#171717] `}>
                    {isOpen ? `-` : `+`}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className={
                    isOpen
                      ? `mt-[15px] block h-auto translate-y-0 py-[1rem] transition-all duration-[750ms]`
                      : `hidden h-min -translate-y-full py-[1rem] transition-all duration-[750ms] `
                  }
                >
                  <Filter
                    filter={filter}
                    selectedFilters={selectedFilters}
                    setTempSelectedFilters={setTempSelectedFilters}
                    changeFilters={changeFilters}
                    setChangeFilters={setChangeFilters}
                    setSelectedFilters={setSelectedFilters}
                    setPage={setPage}
                    tempSelectedFilters={tempSelectedFilters}
                    setLastSelectedFilterKey={setLastSelectedFilterKey}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`sticky bottom-0 mt-auto flex items-center justify-center divide-x`}
        >
          <button
            className={`active-hover flex-1`}
            onClick={() => {
              setTempSelectedFilters([]);
              setSelectedFilters([]);
              setFilterOpen(false);
            }}
          >
            <p className={`py-3 text-center text-[1.2rem] font-light`}>
              Reset Filters
            </p>
          </button>
          <button
            className={`active-hover flex-1`}
            onClick={() => {
              setSelectedFilters(tempSelectedFilters);
              setFilterOpen(false);
            }}
          >
            <p className={`py-3 text-center text-[1.2rem] font-light`}>
              Apply Filters
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersMobile;
