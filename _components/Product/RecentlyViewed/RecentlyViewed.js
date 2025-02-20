"use client";

import { useEffect, useState } from "react";
import Thumb from "@/_components/Thumb/Thumb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const RecentlyViewed = ({ className }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (typeof localStorage !== "undefined" && window) {
      let items = localStorage?.getItem("recentlyViewedProducts");
      if (items) {
        items = JSON.parse(items);
        setProducts(items);
      }
    }
  }, []);

  const [swiper, setSwiper] = useState(null);
  const handleNextSlide = () => {
    swiper.slideNext();
  };
  const handlePrevSlide = () => {
    swiper.slidePrev();
  };

  return (
    <>
      {products?.length > 0 && (
        <div className={`flex flex-col gap-4`}>
          <div className={`flex w-full items-center justify-between`}>
            <span className={`${className} font-medium`}>Recently Viewed</span>
            <span
              className={`${className} cursor-pointer font-medium hover:underline`}
              onClick={() => {
                if (typeof localStorage !== "undefined") {
                  localStorage.removeItem("recentlyViewedProducts");
                }
                setProducts([]);
              }}
            >
              Clear History
            </span>
          </div>

          <div className={`!relative`}>
            {swiper?.params?.slidesPerView < products?.length && (
              <div
                className={`absolute left-[-15px] top-1/2 z-[5] flex h-10 w-10 -translate-y-full transform cursor-pointer items-center justify-center bg-[#333333] max-sm:hidden`}
                onClick={handlePrevSlide}
              >
                <i className={`fas fa-chevron-left text-white`}></i>
              </div>
            )}
            <Swiper
              onSwiper={(swiper) => setSwiper(swiper)}
              slidesPerView={1.5}
              spaceBetween={20}
              rewind={true}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3.5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1300: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1500: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
              className={`!relative`}
            >
              {(products ?? [])?.map(
                ({
                  data: {
                    item: {
                      data: {
                        item: {
                          basic_data: { id_product: id, name },
                          price,
                          inventory,
                          slug_path,
                        },
                      },
                      basic_data: { image },
                    },
                  },
                }) => {
                  return (
                    <SwiperSlide key={id}>
                      <Thumb
                        inventory={inventory}
                        price={price}
                        name={name}
                        className={className}
                        id={id}
                        slug_path={slug_path}
                        slider={true}
                        images={image[0] ?? ["/maximon.png"]}
                      />
                    </SwiperSlide>
                  );
                },
              )}
            </Swiper>
            {swiper?.params?.slidesPerView < products?.length && (
              <div
                className={`absolute right-[-15px] top-1/2 z-[5] flex h-10 w-10 -translate-y-full transform cursor-pointer items-center justify-center bg-[#333333] max-sm:hidden`}
                onClick={handleNextSlide}
              >
                <i className={`fas fa-chevron-right text-white`}></i>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyViewed;
