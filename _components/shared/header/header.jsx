"use client";
import { Layout } from "@/_components/shared/ui/layout";
import items from "./items.json";
import Link from "next/link";
import Image from "next/image";
import { ActionItems } from "@/_components/shared/header/action-items";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Categories } from "@/_components/shared/header/categories";
import { useIsSticky } from "@/_hooks/ecommerce.hooks";

export const Header = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const isSticky = useIsSticky();

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-all duration-500 max-lg:hidden ${isSticky ? "py-3" : "py-8"}`}
    >
      <Layout>
        <div className={`flex items-center justify-between`}>
          <div className={`relative flex items-center gap-8`}>
            {items?.map(({ id, name, slug, isMenu }) => {
              return isMenu ? (
                <span
                  onMouseEnter={() => setOpenMenu(true)}
                  key={id}
                  className={`active-hover relative cursor-pointer font-sans text-[1rem] 2xl:text-[1.253rem] ${openMenu && "active-selected"}`}
                >
                  {name}
                </span>
              ) : (
                <Link
                  href={`${slug}`}
                  onMouseEnter={() => {
                    setOpenMenu(false);
                  }}
                  key={id}
                  className={`active-hover font-sans text-[1rem] 2xl:text-[1.253rem] ${pathname === slug && !openMenu && "active-selected"}`}
                >
                  {name}
                </Link>
              );
            })}
            <Categories openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
          <Link href={`/`} className={`mx-auto pr-[15rem]`}>
            <Image
              src={`/images/logo.png`}
              priority={true}
              alt={`Alesari shoes`}
              width={282}
              height={50}
            />
          </Link>
          <ActionItems pathname={pathname} />
        </div>
      </Layout>
    </header>
  );
};
