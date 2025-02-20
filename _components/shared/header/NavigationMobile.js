"use client";
import {
  useCartBadge,
  useCategoryTree,
  useWishlistBadge,
} from "@/_hooks/ecommerce.hooks";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MobileSearch } from "@/_components/shared/header/mobile-search";
import Link from "next/link";
import { MobileMenu } from "@/_components/shared/header/mobile-menu";
import { icons } from "@/lib/icons/icons";

export const NavigationMobile = () => {
  const router = useRouter();
  const { data: categories } = useCategoryTree();
  const { data: cart_count } = useCartBadge();
  const { data: wishlist_count } = useWishlistBadge();

  const menu_items = {
    categories: [...categories],
    pages: [
      {
        id: "about",
        name: "Our Story",
        href: "/the-art-of-alesari",
      },
      {
        id: "contact",
        name: "Contact Us",
        href: "/contact-us",
      },
    ],
  };

  const [data, setData] = useState({
    menu: {
      open: false,
    },
    search: {
      open: false,
      term: "",
    },
  });

  const handleOpenMenu = (open) => {
    setData({
      ...data,
      menu: {
        open: open,
      },
    });
  };

  const handleOpenSearch = (open, term) => {
    setData({
      ...data,
      search: {
        open: open,
        term: term,
      },
    });
  };

  const handleSearchOnChange = (term) => {
    setData({
      ...data,
      search: {
        ...data.search,
        term: term,
      },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (data?.search?.term?.length >= 3) {
      router.push(`/search?query=${data?.search?.term}`);
      handleOpenSearch(false, "");
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white px-2 py-2 lg:hidden`}>
        <nav className={`flex items-center justify-between`}>
          <Image
            onClick={handleOpenMenu}
            src={`/icons/hamburger.png`}
            alt={`Menu`}
            width={24}
            height={24}
          />
          <Link href={`/`}>
            <Image
              src={`/images/logo.png`}
              alt={`Alesari`}
              width={140}
              height={100}
              sizes={`70vw`}
              className={`mx-auto h-auto`}
            />
          </Link>
          <div className={`flex items-center gap-2`}>
            <a href={`/bag`} className={`relative`}>
              {icons.bag}
              {cart_count > 0 && (
                <span
                  className={`absolute -right-1 -top-2 rounded-full bg-red-500 px-1 font-sans text-xs font-bold text-white`}
                >
                  {cart_count}
                </span>
              )}
            </a>
            <Link href={`/wishlist`} className={`relative`}>
              {icons.heart}{" "}
              {wishlist_count > 0 && (
                <span
                  className={`absolute -right-1 -top-2 rounded-full bg-red-500 px-1 font-sans text-xs font-bold text-white`}
                >
                  {wishlist_count}
                </span>
              )}
            </Link>
            <span onClick={handleOpenSearch}>{icons.search}</span>
          </div>
        </nav>
      </header>
      <MobileSearch
        handleSearch={handleSearch}
        handleOpenSearch={handleOpenSearch}
        data={data}
        handleSearchOnChange={handleSearchOnChange}
      />
      <MobileMenu
        data={data}
        handleOpenMenu={handleOpenMenu}
        menuItems={menu_items}
      />
    </>
  );
};
