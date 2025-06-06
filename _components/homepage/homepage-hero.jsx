"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import { Button } from "@/_components/shared/ui/button";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import { icons } from "@/lib/icons/icons";

export const HomepageHero = ({ banners }) => {
  const [swiper, setSwiper] = useState(null);

  const handleNextSlide = (swiper) => {
    swiper?.slideNext();
  };
  const handlePrevSlide = (swiper) => {
    swiper?.slidePrev();
  };

  let split_text = banners?.desktop?.[0]?.text?.split(" ");
  let last_element = split_text?.pop();

  const renderChevrons = () => {
    let banners_length = banners?.desktop?.length;

    if (banners_length > 1) {
      return (
        <div
          className={`absolute bottom-3 z-[5] mx-auto flex w-full items-center justify-center gap-5`}
        >
          <span
            onClick={() => {
              handlePrevSlide(swiper);
            }}
            className={`cursor-pointer rounded-full p-1.5 text-white hover:text-white`}
          >
            {icons.chevron_left}
          </span>

          <span
            onClick={() => {
              handleNextSlide(swiper);
            }}
            className={`cursor-pointer rounded-full p-1.5 text-white  hover:text-white`}
          >
            {icons.chevron_right}
          </span>
        </div>
      );
    }

    return null;
  };

  const renderDesktopBanners = () => {
    return (
      <>
        <Swiper
          rewind
          onSwiper={(swiper) => setSwiper(swiper)}
          className={`!relative`}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            pauseOnMouseEnter: true,
          }}
        >
          {(banners?.desktop || [])?.map(
            (
              {
                image,
                button,
                text,
                subtitle,
                title,
                target,
                url,
                file_data: {
                  banner_position: { width, height },
                  descriptions: { alt },
                },
              },
              i,
            ) => {
              return (
                <SwiperSlide
                  key={i}
                  className={`relative w-full overflow-hidden`}
                >
                  <Link
                    href={`${url ?? "/page-in-construction"}`}
                    target={`${target ?? "_self"}`}
                  >
                    <Image
                      src={convertHttpToHttps(image)}
                      alt={alt ?? `Alesari`}
                      width={width}
                      height={height}
                      sizes={`100vw`}
                      quality={100}
                    />
                  </Link>
                  <div
                    className={`absolute bottom-[8rem] left-0 mr-auto flex max-w-[35.313rem] flex-col pl-2 xl:pl-[2rem] 3xl:pl-[5rem]`}
                  >
                    {title && (
                      <h4
                        className={`font-sans text-[2.526rem] font-bold leading-[3.216rem] text-white`}
                      >
                        {title}
                      </h4>
                    )}
                    {/* Podnaslov */}
                    {subtitle && (
                      <h5 className="font-sans text-[1.40rem] font-bold leading-[3.216rem] text-white">
                        {subtitle}
                      </h5>
                    )}
                    {button && (
                      <Link
                        href={`${url ?? "/page-in-construction"}`}
                        target={`${target ?? "_self"}`}
                      >
                        <Button
                          className={`mt-[3rem] !border !border-white !bg-transparent !text-white`}
                        >
                          {button}
                        </Button>
                      </Link>
                    )}
                  </div>
                </SwiperSlide>
              );
            },
          )}
          {renderChevrons()}
        </Swiper>

        {banners?.desktop?.[0]?.text && (
          <div
            className={`relative -top-[1px] flex items-center justify-center bg-[#141414] py-3 text-center`}
          >
            <p className={`font-sans text-[2.063rem] text-white`}>
              <q>
                {split_text?.join(" ")}{" "}
                <span className={`text-[#FFD700]`}>{last_element}</span>{" "}
              </q>
            </p>
          </div>
        )}
      </>
    );
  };
  const renderMobileBanners = () => {
    return (
      <>
        <Swiper
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
          }}
        >
          {(banners?.mobile || [])?.map(
            (
              {
                image,
                button,
                text,
                title,
                subtitle,
                target,
                url,
                file_data: {
                  banner_position: { width, height },
                  descriptions: { alt },
                },
              },
              i,
            ) => {
              let split_text;
              let last_element;

              if (text) {
                split_text = text.split(" ");
                last_element = split_text?.pop();
              }

              return (
                <SwiperSlide
                  key={i}
                  className={`relative w-full overflow-hidden`}
                >
                  <Link
                    href={`${url ?? "/page-in-construction"}`}
                    target={`${target ?? "_self"}`}
                  >
                    <Image
                      src={convertHttpToHttps(image)}
                      alt={alt ?? `Alesari`}
                      width={width}
                      height={height}
                      sizes={`100vw`}
                      quality={100}
                    />
                  </Link>
                  <div
                    className={`absolute bottom-[1.2rem] right-0 mx-auto flex w-full flex-col justify-center pr-2 text-center xl:pr-[1rem] 3xl:pr-[2.5rem]`}
                  >
                    {title && (
                      <h1
                        className={`font-sans text-[1.526rem] font-bold leading-[2.216rem] text-white`}
                      >
                        {title}
                      </h1>
                    )}
                    {/* Podnaslov */}
                    {subtitle && (
                      <h5 className="mb-[-2.2rem] font-sans text-[1.0rem] font-bold leading-[3.216rem] text-white">
                        {subtitle}
                      </h5>
                    )}
                    {button && (
                      <Link
                        href={`${url ?? "/page-in-construction"}`}
                        target={`${target ?? "_self"}`}
                      >
                        <Button
                          className={` mb-[-3rem] mt-[2rem] !border-white bg-transparent !text-white`}
                        >
                          {button}
                        </Button>
                      </Link>
                    )}
                  </div>
                </SwiperSlide>
              );
            },
          )}
        </Swiper>
        {banners?.mobile?.[0]?.text && (
          <div
            className={`relative -top-[1px] flex items-center justify-center bg-[#141414] py-2 text-center`}
          >
            <p className={`font-sans text-[1.063rem] text-white`}>
              <q>
                {split_text?.join(" ")}{" "}
                <span className={`text-primary`}>{last_element}</span>{" "}
              </q>
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="max-lg:display lg:hidden">{renderMobileBanners()}</div>
      <div className="lg:display max-lg:!hidden">{renderDesktopBanners()}</div>
    </>
  );
};
