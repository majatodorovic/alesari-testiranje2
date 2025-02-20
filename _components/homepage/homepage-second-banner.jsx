"use client";

import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import { Button } from "@/_components/shared/ui/button";
import Link from "next/link";
import { useImageZoom, useIsMobile } from "@/_hooks/ecommerce.hooks";
import { useEffect } from "react";
import aos from "aos";

export const HomepageSecondBanner = ({ banner }) => {
  //ne diraj ovo - ne koristi se nigde, ali je potrebno zbog nacina na koji funkcionise tailwind - bez ovoga ne radi zoom slike na hover dugmeta
  const scale = "!scale-110";

  const {
    handleOverlayHide,
    handleImageZoomOut,
    handleImageZoomIn,
    handleOverlayShow,
    renderOverlay,
  } = useImageZoom(`homepage-second-banner`, `homepage-second-banner-overlay`);

  useEffect(() => {
    aos.init({
      once: true,
      mirror: false,
      offset: 50,
      duration: 800,
    });
  }, []);

  const is_mobile = useIsMobile();

  return (
    <Layout>
      <div className={`relative overflow-hidden md:-top-20`}>
        <Link
          href={`${banner?.[0]?.url ?? "/page-in-construction"}`}
          target={`${banner?.[0]?.target ?? "_self"}`}
          className={`group max-md:hidden`}
        >
          <Image
            data-aos="flip-down"
            id={`homepage-second-banner`}
            src={banner?.[0]?.image}
            alt={`Alesari`}
            width={0}
            height={0}
            sizes={`100vw`}
            quality={100}
            className={`w-full transition-all duration-500 group-hover:!scale-110`}
          />
          <div
            className={`invisible absolute bottom-0 left-0 right-0 top-0 z-[2] h-full w-full bg-black/40 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100 `}
          ></div>
        </Link>
        <div
          data-aos="fade-left"
          className={`inset-0 right-[4rem] z-[5] my-auto ml-auto flex h-fit w-fit flex-col items-center justify-center bg-white px-2 max-md:py-[4rem] md:absolute md:px-[3.25rem] md:py-[10.625rem]`}
        >
          {banner?.[0]?.title && (
            <h3
              className={`text-center font-serif text-[1.7rem] uppercase leading-[100%] text-black`}
            >
              {banner?.[0]?.title}
            </h3>
          )}
          {banner?.[0]?.subtitle && (
            <h2
              className={`text-center font-serif text-[2.8rem] font-bold uppercase leading-[100%] text-black max-md:text-[2rem]`}
            >
              {banner?.[0]?.subtitle}
            </h2>
          )}
          {banner?.[0]?.text && (
            <p
              className={`mt-[4rem] max-w-[450px] text-center font-sans text-[1.163rem] text-black`}
            >
              {banner?.[0]?.text}
            </p>
          )}
          {banner?.[0]?.button && (
            <Link
              href={`${banner?.[0]?.url ?? "/page-in-construction"}`}
              target={`${banner?.[0]?.target ?? "_self"}`}
            >
              <Button
                onMouseEnter={() => {
                  !is_mobile && handleImageZoomIn();
                  !is_mobile && handleOverlayShow();
                }}
                onMouseLeave={() => {
                  !is_mobile && handleImageZoomOut();
                  !is_mobile && handleOverlayHide();
                }}
                className={`mt-[4rem]`}
              >
                {banner?.[0]?.button}
              </Button>
            </Link>
          )}
        </div>
        <Link
          href={`${banner?.[0]?.url ?? "/page-in-construction"}`}
          target={`${banner?.[0]?.target ?? "_self"}`}
          className={`group relative md:hidden`}
        >
          <Image
            data-aos="flip-down"
            id={`homepage-second-banner`}
            src={banner?.[0]?.image}
            alt={`Alesari`}
            width={0}
            height={0}
            sizes={`100vw`}
            quality={100}
            className={`w-full transition-all duration-500 group-hover:!scale-110 max-md:pb-[4rem]`}
          />
          <div
            className={`invisible absolute bottom-0 left-0 right-0 top-0 z-[2] h-full w-full bg-black/40 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100 `}
          ></div>
        </Link>
        {renderOverlay(`homepage-second-banner-overlay`)}
      </div>
    </Layout>
  );
};
