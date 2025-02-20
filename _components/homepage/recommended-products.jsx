"use client";

import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import Link from "next/link";
import { Stickers } from "@/_components/shared/ui/stickers";
import { useState } from "react";

export const RecommendedProducts = ({ products }) => {
  const [swiper, setSwiper] = useState(null);

  const handleNext = (swiper) => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrev = (swiper) => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  return (
    <div
      className={`bg-[#141414] pt-10 max-md:overflow-hidden max-md:py-10 md:pb-[9.375rem]`}
    >
      <Layout className={`ml-auto flex flex-wrap items-center justify-end`}>
        <h2
          className={`ml-auto self-center text-center font-sans text-[1.7rem] text-white`}
        >
          Welcome to our luxury shoe boutique
        </h2>
        <Link
          href={`/high-heels`}
          className={`active-hover-white text-right font-sans text-[1.2rem] text-white max-md:mx-auto max-md:py-10 md:ml-auto`}
        >
          View all
        </Link>
      </Layout>
      <Image
        src={`/other/gold-divider.png`}
        alt={`Alesari`}
        width={0}
        height={0}
        sizes={`70vw`}
        className={`w-full md:mt-2`}
      />
      <Layout>
        <div className={`relative`}>
          <div
            tabIndex={0}
            onClick={() => handlePrev(swiper)}
            className={`absolute inset-0 -left-[1.65rem] -top-[3.438rem] z-[5] my-auto h-fit w-fit cursor-pointer rounded-full bg-white/60 px-[1.55rem] py-[1.075rem] focus:outline-0 focus:ring-2 focus:ring-primary max-sm:hidden`}
          >
            <Image
              src={`/icons/chevron.png`}
              alt={`Alesari recommended`}
              className={`select-none`}
              width={12}
              height={20}
            />
          </div>
          <Swiper
            rewind
            slidesPerView={1.3}
            onInit={(swiper) => setSwiper(swiper)}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1680: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            spaceBetween={20}
            className={`!relative mt-[3.125rem] max-md:mt-[3.5rem]`}
          >
            {(products ?? [])?.map(
              ({
                id,
                image,
                link: { link_path: slug_path },
                basic_data: { name },
                stickers,
              }) => {
                const hasStickers = stickers?.length > 0;
                return (
                  <SwiperSlide key={id} className={`group relative`}>
                    {hasStickers && (
                      <div
                        className={`absolute right-2 top-2 z-[5] flex flex-col gap-2`}
                      >
                        {stickers?.map(({ name }, i) => {
                          return <Stickers key={i} name={name} />;
                        })}
                      </div>
                    )}
                    <div className={`min-w-full`}>
                      <Link href={`/${slug_path}`}>
                        <Image
                          src={convertHttpToHttps(image?.[0])}
                          alt={`${name ?? "Alesari"}`}
                          width={0}
                          quality={100}
                          height={0}
                          sizes={`100vw`}
                          className={`w-full transition-opacity duration-300 group-hover:opacity-70`}
                        />
                      </Link>
                    </div>
                    <h2
                      className={`mt-2 text-center font-sans text-[1.375rem] text-white transition-colors duration-300 group-hover:text-primary`}
                    >
                      {name}
                    </h2>
                  </SwiperSlide>
                );
              },
            )}
          </Swiper>
          <div
            tabIndex={0}
            onClick={() => handleNext(swiper)}
            className={`absolute inset-0 -right-[1.65rem] -top-[3.438rem] z-[5] my-auto ml-auto h-fit w-fit cursor-pointer rounded-full border border-transparent bg-white/60 px-[1.55rem] py-[1.075rem] focus:outline-0 focus:ring-2 focus:ring-primary max-sm:hidden`}
          >
            <Image
              src={`/icons/chevron.png`}
              alt={`Alesari recommended`}
              width={12}
              height={20}
              className={`rotate-180 select-none`}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};
