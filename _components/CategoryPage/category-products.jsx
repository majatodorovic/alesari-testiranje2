"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  useCategoryFilters,
  useCategoryProducts,
  useCategory,
} from "@/_hooks/ecommerce.hooks";
import Filters from "@/_components/sections/categories/Filters";
import { Thumb } from "@/_components/Thumb/Thumb";
import FiltersMobile from "@/_components/sections/categories/FilterMobile";
import { Button } from "@/_components/shared/ui/button";

export const CategoryProducts = ({
  filters,
  strana,
  sortDirection,
  sortField,
  allFilters = [],
  slug,
  isSection,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [isBeingFiltered, setIsBeingFiltered] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  //params iz URL-a
  const filterKey = params?.get("filters");
  const pageKey = Number(params?.get("strana"));
  const sortKey = params?.get("sort");
  const initialViewed = Number(params?.get("viewed")) || 8;
  const [viewed, setViewed] = useState(initialViewed > 8 ? initialViewed : 8);
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState({
    field: sortField ?? "",
    direction: sortDirection ?? "",
  });
  const [selectedFilters, setSelectedFilters] = useState(filters ?? []);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(allFilters ?? []);
  const [changeFilters, setChangeFilters] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");

  const updateURLQuery = (sort, selectedFilters, page) => {
    let sort_tmp;
    let filters_tmp;
    let viewed_tmp;
    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters?.map((filter) => {
        const selectedValues = filter?.value?.selected?.join("_");
        return `${filter?.column}=${selectedValues}`;
      });
    } else {
      filters_tmp = "";
    }

    if (pagination?.total_items - pagination?.items_per_page < 8) {
      viewed_tmp = pagination?.total_items;
    } else {
      viewed_tmp = page === 1 ? viewed : viewed + 8;
    }

    return { sort_tmp, filters_tmp, viewed_tmp };
  };

  useEffect(() => {
    const { sort_tmp, filters_tmp, viewed_tmp } = updateURLQuery(
      sort,
      selectedFilters,
      page,
    );

    const generateQueryString = (sort_tmp, filters_tmp, viewed_tmp) => {
      let queryString = `?${filters_tmp ? `filters=${filters_tmp}` : ""}${
        filters_tmp && (sort_tmp || viewed_tmp) ? "&" : ""
      }${sort_tmp ? `sort=${sort_tmp}` : ""}${
        sort_tmp && viewed_tmp ? "&" : ""
      }${viewed_tmp > 8 ? `viewed=${viewed_tmp}` : ""}`;

      router.push(queryString, { scroll: false });
    };

    generateQueryString(sort_tmp, filters_tmp, viewed_tmp);
  }, [sort, selectedFilters, page]);

  useEffect(() => {
    const initialViewed = Number(params?.get("viewed")) || 8;
    setViewed(initialViewed > 8 ? initialViewed : 8);
  }, []);

  //dobijamo proizvode za kategoriju sa api-ja
  const { data, error, isError, isFetching, isFetched } = useCategoryProducts({
    slug,
    page: 1,
    limit: viewed,
    sort: sortKey ?? "_",
    setSelectedFilters: setSelectedFilters,
    filterKey: filterKey,
    setSort: setSort,
    render: false,
    setIsLoadingMore: setIsLoadingMore,
  });
  const products = data?.items || [];
  const pagination = data?.pagination;
  const { data: singleCategory } = useCategory({ slug });

  const mutateFilters = useCategoryFilters({
    slug,
    page,
    limit: 10,
    sort,
    selectedFilters: tempSelectedFilters,
  });

  //ako je korisnik dosao na stranicu preko linka sa prisutnim filterima u URL,onda se ti filteri selektuju i okida se api da azurira dostupne filtere
  useEffect(() => {
    if (filters?.length > 0) {
      mutateFilters.mutate({
        slug,
        selectedFilters: tempSelectedFilters,
        lastSelectedFilterKey,
        setAvailableFilters,
        availableFilters,
      });
      setTempSelectedFilters(filters);
    }
  }, []);

  //okidamo api za filtere na promenu filtera
  useEffect(() => {
    mutateFilters.mutate({
      slug,
      selectedFilters: tempSelectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    });
  }, [tempSelectedFilters?.length]);
  //pravimo paginaciju
  const getPaginationArray = (selectedPage, totalPages) => {
    const start = Math.max(1, selectedPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  //pamtimo scroll position u session storage, da mozemo da se vratimo na isto mesto
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY;
      setScrollPosition(pos);
      sessionStorage.setItem("scrollPosition", pos.toString());
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedScrollPosition =
      parseInt(sessionStorage.getItem("scrollPosition")) || 0;
    setScrollPosition(storedScrollPosition);
    if (isFetched && viewed > 8) {
      const timeout = setTimeout(() => {
        window.scrollTo(0, storedScrollPosition);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isFetched]);

  return (
    <>
      <div className="mt-[67px]">
        <Filters
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          pagination={pagination}
          setSort={setSort}
          changeFilters={changeFilters}
          setTempSelectedFilters={setTempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
          setChangeFilters={setChangeFilters}
          setIsBeingFiltered={setIsBeingFiltered}
          setOpenFilter={setFilterOpen}
          setPage={setPage}
        />
      </div>
      {products?.length > 0 ? (
        <>
          <div className={`px-[1.2rem]`}>
            <div
              className={`mt-[1.875rem] grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}
            >
              {(products ?? [])?.map(({ id }) => {
                return (
                  <Suspense
                    fallback={
                      <div
                        className={`aspect-2/3 h-full w-full animate-pulse bg-slate-300`}
                      />
                    }
                  >
                    <Thumb id={id} key={id} categoryId={slug} />
                  </Suspense>
                );
              })}
            </div>
          </div>
          {pagination?.items_per_page < pagination?.total_items && (
            <button
              className="ease mx-auto mt-6 flex w-fit cursor-pointer border-b-2 border-[#6d6d6d] pb-1 text-[14px] uppercase text-[#6d6d6d] transition-all hover:border-black hover:text-black md:mt-[7rem]"
              onClick={() => {
                setViewed(viewed + 8);
                setPage(page + 1);
              }}
            >
              {" "}
              {isLoadingMore ? (
                <i
                  className={`fa fa-solid fa-spinner fa-spin text-lg text-white`}
                />
              ) : (
                "Discover more"
              )}
            </button>
          )}
        </>
      ) : (
        <div className="flex w-full items-center justify-center py-10 text-center">
          <h1 className="text-[1.1rem] text-[#191919]">
            No products in this category. Please try again later.
          </h1>
        </div>
      )}

      <div
        className={
          filterOpen
            ? `fixed left-0 top-0 z-[3000] h-[100dvh] translate-x-0 bg-white duration-500 max-md:w-full md:w-[30%]`
            : `fixed left-0 top-0 z-[3000] h-[100dvh] -translate-x-full bg-white duration-500 max-md:w-full md:w-[30%]`
        }
      >
        <FiltersMobile
          selectedFilters={selectedFilters}
          availableFilters={availableFilters}
          setSelectedFilters={setSelectedFilters}
          sort={sort}
          pagination={pagination}
          setSort={setSort}
          changeFilters={changeFilters}
          setFilterOpen={setFilterOpen}
          setTempSelectedFilters={setTempSelectedFilters}
          setChangeFilters={setChangeFilters}
          tempSelectedFilters={tempSelectedFilters}
          setLastSelectedFilterKey={setLastSelectedFilterKey}
        />
      </div>
      <div
        onClick={() => {
          setFilterOpen(false);
        }}
        className={
          filterOpen
            ? `visible fixed left-0 top-0 z-[60] h-dvh w-dvw bg-black/40 opacity-100 backdrop-blur-sm transition-all duration-500`
            : `invisible fixed left-0 top-0 z-[60] h-dvh w-dvw bg-transparent opacity-0 backdrop-blur-sm transition-all duration-500`
        }
      />

      <div
        className={
          selectedFilters?.length > 0
            ? `fixed bottom-5 right-5 z-10 flex translate-y-0 flex-col gap-2 transition-all duration-500`
            : `fixed bottom-5 right-5 z-10 flex translate-y-[150%] flex-col gap-2 transition-all duration-500`
        }
      >
        <Button
          className={`border !text-[1rem]`}
          onClick={() => {
            setSelectedFilters([]);
          }}
        >
          Reset Filters
        </Button>
      </div>
    </>
  );
};
