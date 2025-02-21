import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { log } from "next/dist/server/typescript/utils";
import { useLandingPages } from "@/_hooks/ecommerce.hooks";

export const MobileMenu = ({ handleOpenMenu, menuItems, data }) => {
  const [selectedCategory, setSelectedCategory] = useState({
    children: [],
  });
  const { data: landingPagesList } = useLandingPages();
  const pathname = usePathname();

  const handleSelectedCategory = (children) => {
    if (children === selectedCategory?.children) {
      setSelectedCategory({ children: [] });
    } else {
      setSelectedCategory({
        children: children,
      });
    }
  };
  return (
    <>
      <div
        onClick={() => {
          handleOpenMenu(false);
        }}
        className={
          data?.menu?.open ? `modal-open-overlay` : `modal-closed-overlay`
        }
      ></div>

      <div
        className={
          data?.menu?.open
            ? `modal-open-side flex h-full flex-col pt-5`
            : `modal-closed-side flex h-full flex-col pt-5`
        }
      >
        <Image
          onClick={() => {
            handleOpenMenu(false);
          }}
          src={`/images/logo.png`}
          alt={`Alesari`}
          width={200}
          height={100}
          className={`mx-auto`}
        />

        <div className={`mt-10 flex flex-col gap-5 px-2`}>
          {(menuItems?.categories ?? [])?.map(
            ({ id, name, children, link: { link_path: slug_path } }) => {
              const has_children = children?.length > 0;
              return has_children ? (
                <div className={`flex flex-col gap-2`} key={id}>
                  <div
                    onClick={() => {
                      handleSelectedCategory(children);
                    }}
                    key={id}
                    className={`flex items-center justify-between`}
                  >
                    <span
                      className={`font-sans text-base font-bold ${(selectedCategory?.children === children || pathname?.includes(slug_path)) && "active-selected"}`}
                    >
                      {name}
                    </span>
                    <Image
                      src={`/icons/arrow.png`}
                      width={12}
                      className={`${selectedCategory?.children?.length > 0 && "rotate-90"} transition-all duration-300`}
                      height={20}
                      alt={`Alesari arrow right`}
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-2 ${selectedCategory?.children?.length > 0
                        ? `visible mt-2 pl-5`
                        : `hidden`
                      }`}
                  >
                    {children.map(
                      ({ id, name, link: { link_path: slug_path } }) => (
                        <Link
                          key={id}
                          className={`font-sans text-base ${pathname?.includes(slug_path) && "active-selected"}`}
                          href={`/${slug_path}`}
                          onClick={() => {
                            handleSelectedCategory([]);
                            handleOpenMenu(false);
                          }}
                        >
                          {name}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={id}
                  className={`font-sans text-base font-bold ${pathname?.includes(slug_path) && selectedCategory?.children?.length === 0 && "active-selected"}`}
                  href={`/${slug_path}`}
                  onClick={() => {
                    handleSelectedCategory([]);
                    handleOpenMenu(false);
                  }}
                >
                  {name}
                </Link>
              );
            },
          )}
        </div>
        <div className="mt-[2.2rem] flex flex-col gap-2 border-t border-black py-5 pl-2">
          <p className="mb-3 font-sans text-base font-bold">Explore</p>

          <Link
            href="/contact-us"
            onClick={() => handleOpenMenu(false)}
            className="pl-3 font-sans text-base font-bold uppercase"
          >
            <span className="pr-2">•</span> Connect with us
          </Link>

          <Link
            href="/customer-care"
            onClick={() => handleOpenMenu(false)}
            className="pl-3 font-sans text-base font-bold uppercase"
          >
            <span className="pr-2">•</span> Customer care
          </Link>

          <Link
            href="/discover-the-designer"
            onClick={() => handleOpenMenu(false)}
            className="pl-3 font-sans text-base font-bold uppercase"
          >
            <span className="pr-2">•</span> Discover the designer
          </Link>

          <Link
            href="/who-is-alesari-woman"
            onClick={() => handleOpenMenu(false)}
            className="pl-3 font-sans text-base font-bold uppercase"
          >
            <span className="pr-2">•</span> Who is Alesari Women
          </Link>

          <Link
            href="/page/made-for-you"
            onClick={() => handleOpenMenu(false)}
            className="pl-3 font-sans text-base font-bold uppercase"
          >
            <span className="pr-2">•</span> Made for you
          </Link>

          <Link
            href="page/alesari-bridal-couture"
            onClick={() => handleOpenMenu(false)}
            className="pl-3 font-sans text-base font-bold uppercase"
          >
            <span className="pr-2">•</span> Alesari Bridal Couture
          </Link>

        </div>
        <div className={`mt-auto flex flex-col`}>
          {menuItems?.pages?.map(({ id, name, href }) => {
            return (
              <Link
                key={id}
                className={`block !w-full px-2 py-3 font-sans text-base font-bold odd:bg-[#f8f8f8]`}
                href={href}
                onClick={() => {
                  handleSelectedCategory([]);
                  handleOpenMenu(false);
                }}
              >
                <span className={``}>{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
