"use client";
import { Button } from "@/_components/shared/ui/button";
import Link from "next/link";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import { Layout } from "@/_components/shared/ui/layout";
import { useImageZoom } from "@/_hooks/ecommerce.hooks";
import aos from "aos";
import { useEffect } from "react";

export const StaticBanners = ({
  banner,
  isAnchored = true,
  type = "bold_first",
  invert = false,
  overlay_id = "",
  element_id = "",
  className,
}) => {
  //ne diraj ovo - ne koristi se nigde, ali je potrebno zbog nacina na koji funkcionise tailwind - bez ovoga ne radi zoom slike na hover dugmeta
  const scale = "!scale-110";
  useEffect(() => {
    aos.init({
      once: true,
      mirror: false,
      offset: 50,
      duration: 800,
    });
  }, []);

  const {
    handleOverlayHide,
    handleImageZoomOut,
    handleImageZoomIn,
    handleOverlayShow,
    renderOverlay,
  } = useImageZoom(element_id, overlay_id);

  const handleOrder = (type, title, subtitle) => {
    switch (type) {
      case "bold_first":
        return (
          <>
            {title && (
              <h2
                data-aos="fade-down"
                className={`font-serif text-[2.8rem] font-bold uppercase leading-[100%]`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <h3
                data-aos="fade-up"
                className={`font-serif text-[1.7rem] uppercase leading-[100%]`}
              >
                {subtitle}
              </h3>
            )}
          </>
        );
      case "bold_last":
        return (
          <>
            {title && (
              <h2
                data-aos="fade-up"
                className={`font font-serif text-[1.7rem] uppercase leading-[100%]`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <h3
                data-aos="fade-down"
                className={`font-serif text-[2.8rem] font-bold uppercase leading-[100%]`}
              >
                {subtitle}
              </h3>
            )}
          </>
        );
    }
  };

  switch (isAnchored) {
    case true:
      return (
        <>
          {banner?.map(
            ({ image, title, subtitle, text, button, url, target }, i) => {
              return (
                <div
                  key={i}
                  className={`grid ${className} grid-cols-2 place-items-center gap-x-[4.25rem] max-md:mt-[4rem] md:my-[4rem]`}
                >
                  <Layout
                    className={`flex flex-col items-center justify-center max-md:col-span-2 md:col-span-1`}
                  >
                    {handleOrder(type, title, subtitle)}
                    {text && (
                      <p
                        data-aos={`zoom-in`}
                        className={`mt-[4rem] text-center font-sans text-[1.163rem] leading-tight`}
                        dangerouslySetInnerHTML={{ __html: text }}
                      ></p>
                    )}
                    <Link
                      className={`mt-[4rem] max-md:mb-[4rem]`}
                      href={`${url ?? "/page-in-construction"}`}
                      target={`${target ?? "_self"}`}
                    >
                      <Button
                        onMouseEnter={() => {
                          handleImageZoomIn();
                          handleOverlayShow();
                        }}
                        onMouseLeave={() => {
                          handleImageZoomOut();
                          handleOverlayHide();
                        }}
                        element_id={element_id}
                      >
                        {button ?? "Learn More"}
                      </Button>
                    </Link>
                  </Layout>
                  <div
                    className={`group relative overflow-hidden max-md:col-span-2 max-md:mt-2 max-md:w-full md:col-span-1 md:w-[80%]`}
                  >
                    <Link
                      href={`${url ?? "/page-in-construction"}`}
                      target={`${target ?? "_self"}`}
                    >
                      <Image
                        data-aos={`fade-down`}
                        id={element_id}
                        src={convertHttpToHttps(image)}
                        alt={title ?? "Alesari"}
                        width={0}
                        height={0}
                        sizes={`100vw`}
                        onMouseEnter={() => {
                          handleImageZoomIn();
                          handleOverlayShow();
                        }}
                        onMouseLeave={() => {
                          handleImageZoomOut();
                          handleOverlayHide();
                        }}
                        quality={100}
                        className={`w-full transition-all duration-500 group-hover:!scale-110`}
                      />
                      <div
                        className={`invisible absolute bottom-0 left-0 right-0 top-0 z-[2] h-full w-full bg-black/40 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100`}
                      ></div>
                      {renderOverlay(overlay_id)}
                    </Link>
                  </div>
                </div>
              );
            },
          )}
        </>
      );
    case false:
      return (
        <Layout className={className}>
          {(banner ?? [])?.map(
            ({ image, title, subtitle, text, button, url, target }, i) => {
              return (
                <div
                  key={i}
                  className={`grid grid-cols-2 place-items-center gap-x-[4.25rem] max-md:pb-[4rem] md:my-[4rem] ${element_id === "made-for-you" ? "md:mt-5 md:pt-2" : element_id === "connect-with-us" ? "" : ""} ${
                    invert
                      ? "md:col-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-1"
                      : ""
                  }`}
                >
                  <div
                    className={`order-1 flex flex-col items-center justify-center max-md:order-2 max-md:col-span-2 max-md:mb-2 md:col-span-1 `}
                  >
                    {handleOrder(type, title, subtitle)}

                    {text && (
                      <p
                        className={`mt-[4rem] text-center font-sans text-[1.163rem] leading-tight`}
                        dangerouslySetInnerHTML={{ __html: text }}
                      ></p>
                    )}
                    <Link
                      className={`mt-[4rem] max-md:mb-[4rem]`}
                      href={`${url ?? "/page-in-construction"}`}
                      target={`${target ?? "_self"}`}
                    >
                      <Button
                        onMouseEnter={() => {
                          handleImageZoomIn();
                          handleOverlayShow();
                        }}
                        onMouseLeave={() => {
                          handleImageZoomOut();
                          handleOverlayHide();
                        }}
                        element_id={element_id}
                      >
                        {button ?? "Learn More"}
                      </Button>
                    </Link>
                  </div>
                  <div
                    className={`group relative order-2 w-full overflow-hidden max-md:order-1 max-md:col-span-2 max-md:row-start-2 max-md:mb-5 ${
                      invert
                        ? "md:col-span-1 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-1"
                        : ""
                    }`}
                  >
                    <Link
                      href={`${url ?? "/page-in-construction"}`}
                      target={`${target ?? "_self"}`}
                    >
                      <Image
                        data-aos={`fade-up`}
                        id={element_id}
                        src={convertHttpToHttps(image)}
                        alt={title ?? "Alesari"}
                        width={0}
                        height={0}
                        sizes={`100vw`}
                        quality={100}
                        className={`w-full transition-all duration-500 group-hover:!scale-110`}
                      />
                      <div
                        className={`invisible absolute bottom-0 left-0 right-0 top-0 z-[2] h-full w-full bg-black/40 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100`}
                      ></div>
                      {renderOverlay(overlay_id)}
                    </Link>
                  </div>
                </div>
              );
            },
          )}
        </Layout>
      );
  }
};
