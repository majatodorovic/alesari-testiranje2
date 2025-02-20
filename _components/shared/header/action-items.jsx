import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartBadge, useWishlistBadge } from "@/_hooks/ecommerce.hooks";
import { icons } from "@/lib/icons/icons";

export const ActionItems = ({ pathname }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");

  const inputRef = useRef();

  const router = useRouter();

  useEffect(() => {
    if (searchOpen) {
      inputRef?.current?.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (term?.length >= 3) {
      router.push(`/search?query=${term}`);
      setTerm("");
      setSearchOpen(false);
    }
  };

  const { data: cart_count } = useCartBadge();
  const { data: wishlist_count } = useWishlistBadge();

  return (
    <>
      <div className={`flex items-center gap-8 font-sans`}>
        <div
          className={`group flex cursor-pointer items-center gap-1`}
          onClick={() => setSearchOpen(!searchOpen)}
        >
          {icons?.search}
        </div>
        {/* <Link
          href={`/profile`}
          className={`group flex cursor-pointer items-center gap-1`}
        >
          {icons?.user}


        </Link> */}
        <Link
          href={`/wishlist`}
          className={`group relative flex cursor-pointer items-center gap-1`}
        >
          {icons?.heart}

          {wishlist_count > 0 && (
            <span
              className={`absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-xs font-bold text-white`}
            >
              {wishlist_count}
            </span>
          )}
        </Link>
        <Link
          href={`/bag`}
          className={`group relative flex cursor-pointer items-center gap-1`}
        >
          {icons?.bag}

          {cart_count > 0 && (
            <span
              className={`absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-xs font-bold text-white`}
            >
              {cart_count}
            </span>
          )}
        </Link>
      </div>
      <div
        className={
          searchOpen
            ? `visible fixed left-0 top-0 z-20 h-dvh w-dvw bg-black/40 opacity-100 backdrop-blur-sm transition-all duration-500`
            : `invisible fixed left-0 top-0 z-20 h-dvh w-dvw bg-transparent opacity-0 backdrop-blur-sm transition-all duration-500`
        }
        onClick={() => {
          setSearchOpen(false);
          setTerm("");
        }}
      />
      <div
        className={
          searchOpen
            ? `fixed bottom-0 left-0 right-0 z-30 w-full translate-y-0 bg-white py-[5rem] transition-all duration-300`
            : `fixed bottom-0 left-0 right-0 z-30 w-full translate-y-full bg-white py-[5rem] transition-all duration-300`
        }
      >
        <div className={`relative mx-auto w-fit font-sans`}>
          <form className={`flex items-center gap-2`} onSubmit={handleSearch}>
            <input
              ref={inputRef}
              value={term}
              placeholder={`Enter your search term...`}
              type={`text`}
              onChange={({ target: { value } }) => {
                setTerm(value);
              }}
              className={`w-[20rem] rounded-md border border-slate-300 text-base hover:border-black focus:border-black focus:outline-0 focus:ring-1 focus:ring-black`}
            />
            <button
              onClick={handleSearch}
              className={`self-stretch rounded-md bg-black px-3 hover:bg-black/80`}
            >
              <Image
                src={`/icons/search.png`}
                width={20}
                height={20}
                className={`invert`}
                alt={`Alesari search`}
              />
            </button>
          </form>
          {term?.length >= 1 && term?.length < 3 && (
            <p className={`absolute -bottom-7 mr-auto text-sm text-red-500`}>
              Please enter at least 3 characters
            </p>
          )}
        </div>
      </div>
    </>
  );
};
