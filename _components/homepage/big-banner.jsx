"use client";
import Image from "next/image";
import Link from "next/link";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import { Layout } from "@/_components/shared/ui/layout";
import { useEffect } from "react";
import aos from "aos";
import { useIsMobile } from "@/_hooks/ecommerce.hooks";

export const BigBanner = ({ banner }) => {
  useEffect(() => {
    aos.init({
      once: true,
      mirror: false,
      offset: 50,
      duration: 2000,
    });
  }, []);

  const is_mobile = useIsMobile();

  return (
    <div className={`relative`}>
      <Link
        href={`${is_mobile ? banner?.mobile?.[0]?.url : banner?.desktop?.[0]?.url ?? "/page-in-construction"}`}
        target={`${is_mobile ? banner?.mobile?.[0]?.target : banner?.desktop?.[0]?.target ?? "_self"}`}
        className={`group`}
      >
        <div className={`overflow-hidden`}>
          <Image
            data-aos="zoom-in-left"
            src={convertHttpToHttps(
              is_mobile
                ? banner?.mobile?.[0]?.image
                : banner?.desktop?.[0]?.image,
            )}
            alt={`${banner?.[0]?.title}`}
            width={0}
            height={0}
            sizes={`100vw`}
            quality={100}
            className={`!h-auto w-full transition-all duration-500 group-hover:!scale-110`}
          />
        </div>
        <div
          className={`invisible absolute bottom-0 left-0 right-0 top-0 z-[2] h-full w-full bg-black/40 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100`}
        ></div>
      </Link>
      <Link
        href={`${is_mobile ? banner?.mobile?.[0]?.url : banner?.desktop?.[0]?.url ?? "/page-in-construction"}`}
        target={`${is_mobile ? banner?.mobile?.[0]?.target : banner?.desktop?.[0]?.target ?? "_self"}`}
        className={`group`}
      >
        <div
          className={`absolute top-0 z-[3] w-full bg-[#141414] bg-opacity-60 py-[1rem] transition-all duration-500 max-md:h-fit md:py-[3.125rem]`}
        >
          <Layout
            className={`flex flex-row max-md:flex-col max-md:pl-4 md:items-center md:justify-between`}
          >
            <div className={`flex flex-col`}>
              {(is_mobile
                ? banner?.mobile?.[0]?.title
                : banner?.desktop?.[0]?.title) && (
                <h2
                  className={`font-serif text-[1.4rem] uppercase text-white md:text-[2rem]`}
                >
                  {is_mobile
                    ? banner?.mobile?.[0]?.title
                    : banner?.desktop?.[0]?.title}
                </h2>
              )}
              {(is_mobile
                ? banner?.mobile?.[0]?.subtitle
                : banner?.mobile?.[0]?.subtitle) && (
                <h3
                  className={`font-serif text-[2.2rem] font-bold uppercase text-white md:text-[3rem]`}
                >
                  {is_mobile
                    ? banner?.mobile?.[0]?.subtitle
                    : banner?.desktop?.[0]?.subtitle}
                </h3>
              )}
            </div>
            {(is_mobile
              ? banner?.mobile?.[0]?.text
              : banner?.mobile?.[0]?.text) && (
              <p
                className={`font-sans text-[1.7rem] text-white max-md:text-[1rem] md:text-[2.5rem]`}
              >
                {is_mobile
                  ? banner?.mobile?.[0]?.text
                  : banner?.desktop?.[0]?.text}
              </p>
            )}
          </Layout>
          <Image
            src={`/other/gold-divider.png`}
            alt={`Alesari`}
            width={0}
            height={0}
            sizes={`50vw`}
            className={`absolute bottom-0 mt-auto w-full`}
          />
        </div>
      </Link>
    </div>
  );
};
