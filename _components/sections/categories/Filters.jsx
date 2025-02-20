"use client";
import Filter from "./Filter";
import { sortKeys } from "@/_helpers/const";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import filtericon from "../../../public/icons/filter.png";
import { useSearchParams } from "next/navigation";
const Filters = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  setSort,
  pagination,
  sort,
  products,
  setProductsPerView,
  productsPerView,
  setTempSelectedFilters,
  setLastSelectedFilterKey,
  setChangeFilters,
  filter,
  setPage,
  setOpenFilter,
}) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openSort, setOpenSort] = useState({
    open: false,
    key: {
      field: sort?.field,
      direction: sort?.direction,
    },
  });

  const filterRef = useRef(null);

  const handleClickInsideAndOutside = (e) => {
    // Close the filter if the click occurred outside of it or if the user clicked on the filter

    if (
      (!filterRef?.current?.contains(e.target) ||
        e.target?.classList?.contains("filter")) &&
      openIndex !== null
    ) {
      setOpenIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickInsideAndOutside);
    return () => {
      document.removeEventListener("click", handleClickInsideAndOutside);
    };
  }, [openIndex]);

  const sortRef = useRef(null);

  const handleClickInsideAndOutsideSort = (e) => {
    if (
      (!sortRef?.current?.contains(e.target) ||
        e.target?.classList?.contains("sortref")) &&
      openSort !== false
    ) {
      setOpenSort({
        ...openSort,
        open: false,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickInsideAndOutsideSort);
    return () => {
      document.removeEventListener("click", handleClickInsideAndOutsideSort);
    };
  }, [openSort]);

  const params = useSearchParams();
  const sortParam = params?.get("sort") ?? "_";

  const keys = sortParam?.split("_");

  useEffect(() => {
    if (sortParam) {
      setSort({
        field: keys[0],
        direction: keys[1],
      });
    }
  }, [sortParam]);

  return (
    <>
      <div className="flex items-center justify-between bg-[#f4f2f0] px-[20px] py-[8px]">
        <div
          className={`flex cursor-pointer select-none items-center gap-[1rem]`}
          
        >
          {/* <Image
            src={filtericon}
            alt="Alesari filter icon"
            width={26}
            height={26}
            onClick={() => setOpenFilter(true)}
          />
          <p className="active-hover text-center font-sans text-[18px] font-bold">
            Show Filters
          </p> */}
        </div>
        <div className="relative col-span-1 col-start-7 flex items-center justify-end">
          <p className="text-center font-sans text-[18px] font-bold">
            {pagination?.total_items}{" "}
            {pagination?.total_items > 1 ? "Products" : "Product"}
          </p>
        </div>
        <div className={`flex items-center gap-10`}>
          <div className="relative col-span-1 col-start-8 flex items-center justify-end">
            <div
              className="flex cursor-pointer items-center gap-3"
              onClick={() =>
                setOpenSort({
                  ...openSort,
                  open: !openSort.open,
                })
              }
            >
              <p
                className={`text-center ${openSort?.open ? "active-selected" : "active-hover"} font-sans text-[18px] font-bold`}
              >
                Sort by
              </p>
              <Image
                className={
                  openSort.open
                    ? `rotate-90 transition-all duration-500`
                    : `rotate-0 transition-all duration-500`
                }
                src={`/icons/arrow.png`}
                alt={`Alesari arrow icon`}
                width={18}
                height={18}
              />
            </div>
            {openSort?.open && (
              <div
                ref={sortRef}
                className="sortref absolute right-[10px] top-[40px] z-[2] flex w-[250px] flex-col items-center justify-end border border-[#f2f2f2] font-sans"
              >
                {sortKeys.map((key) => {
                  const isActive =
                    openSort?.key?.field === key?.field &&
                    openSort?.key?.direction === key?.direction;
                  return (
                    <div
                      className={`sortref flex w-full cursor-pointer items-center justify-start px-4 py-2 text-[0.875rem] text-black ${
                        isActive ? "bg-[#f4f2f0]" : "bg-white "
                      }`}
                      onClick={() =>
                        setSort({
                          field: key?.field,
                          direction: key?.direction,
                        })
                      }
                    >
                      <p
                        className={` sortref ${
                          isActive ? `active-selected` : ``
                        } active-hover text-center text-[1rem] font-light`}
                        onClick={() =>
                          setOpenSort({
                            open: false,
                            key: {
                              field: key?.field,
                              direction: key?.direction,
                            },
                          })
                        }
                      >
                        {key?.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
