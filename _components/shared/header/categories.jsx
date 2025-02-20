"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCategoryTree } from "@/_hooks/ecommerce.hooks";

export const Categories = ({ openMenu, setOpenMenu }) => {
  const { data } = useCategoryTree();

  const [activeCategory, setActiveCategory] = useState({
    id: null,
    children: [],
  });

  return (
    <nav
      className={
        openMenu
          ? "activeMenu relative flex flex-col divide-y font-sans"
          : "inactiveMenu relative flex flex-col divide-y font-sans"
      }
      onMouseLeave={() => {
        setOpenMenu(false);
        setActiveCategory({
          id: null,
          children: [],
        });
      }}
    >
      {(data ?? [])?.map(
        ({
          id,
          name,
          link: { link_path: slug_path },
          description,
          children,
        }) => {
          return children?.length > 0 ? (
            <h3
              onMouseEnter={() => {
                if (children?.length > 0) {
                  setActiveCategory({
                    id: id,
                    children: children,
                  });
                }
              }}
              className={`group relative overflow-hidden`}
              key={id}
            >
              <div
                className={`flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 ${activeCategory?.id === id && "bg-slate-50"}`}
              >
                <div className={`relative flex flex-col`}>
                  <h3 className={`text-lg font-bold`}>{name}</h3>
                  <p className={`text-base`}>Lorem ipsum dolor sit amet</p>
                </div>
                <Image
                  src={`/icons/right-arrow.png`}
                  alt={`Alesari`}
                  width={20}
                  height={20}
                  className={`cursor-pointer transition-all duration-300 group-hover:-rotate-[30deg] ${activeCategory?.id === id && "-rotate-[30deg]"}`}
                />
              </div>
            </h3>
          ) : (
            <Link
              href={`/${slug_path}`}
              onMouseEnter={() => {
                setActiveCategory({
                  id: null,
                  children: [],
                });
              }}
              onClick={() => {
                if (children?.length > 0) {
                  setActiveCategory({
                    id: activeCategory?.id === id ? null : id,
                    children: activeCategory?.id === id ? [] : children,
                  });
                } else {
                  setOpenMenu(false);
                }
              }}
              className={`group relative overflow-hidden`}
              key={id}
            >
              <div
                className={`flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 `}
              >
                <div className={`relative flex flex-col`}>
                  <h3 className={`text-lg font-bold`}>{name}</h3>
                  {slug_path === "high-heels" && (
                    <p className={`font-sans text-base`}>
                      Discover our luxury high heels
                    </p>
                  )}
                  {slug_path === "bridal-collection" && (
                    <p className={`font-sans text-base`}>
                      Discover our Bridal Collection
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        },
      )}
      <div
        className={
          activeCategory?.id
            ? `activeSubMenu flex flex-col divide-y`
            : `inactiveSubMenu flex flex-col divide-y`
        }
      >
        {activeCategory?.children?.map(
          ({
            id,
            name,
            link: { link_path: slug_path },
            description,
            children,
          }) => {
            return (
              <Link
                href={`/${slug_path}`}
                onClick={() => {
                  setOpenMenu(false);
                  setActiveCategory({
                    id: activeCategory?.id === id ? null : id,
                    children: activeCategory?.id === id ? [] : children,
                  });
                }}
                className={`group relative overflow-hidden`}
                key={id}
              >
                <div
                  className={`flex items-center justify-between px-3 py-1.5 hover:bg-slate-50`}
                >
                  <div className={`relative flex flex-col`}>
                    <h3 className={`text-lg font-bold`}>{name}</h3>
                    <p className={`text-base`}>Lorem ipsum dolor sit amet</p>
                  </div>
                </div>
              </Link>
            );
          },
        )}
      </div>
    </nav>
  );
};
