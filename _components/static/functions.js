"use client";

import {
  useLandingPagesBasicData,
  useLandingPagesConditions,
} from "@/_hooks/ecommerce.hooks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/_components/shared/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Suspense, useEffect, useState } from "react";
import { Thumb } from "@/_components/Thumb/Thumb";
import aos from "aos";

const isBridalCouture = (slug) => {
  return slug === "alesari-bridal-couture";
};

const isMadeForYou = (slug) => {
  return slug === "made-for-you";
};

const isAlesariWoman = (slug) => {
  return slug === "who-is-alesari-women";
};

export const BasicData = ({ slug, children }) => {
  const { data: basic_data } = useLandingPagesBasicData({ slug });
  useEffect(() => {
    aos.init({
      once: true,
      mirror: false,
      offset: 50,
      duration: 800,
    });
  }, []);
  if (basic_data) {
    const { name, description, gallery, image } = basic_data;
    let is_bridal = isBridalCouture(slug);
    let is_made_for_you = isMadeForYou(slug);
    let is_alesari_women = isAlesariWoman(slug);

    const splitText = (text) => {
      return text?.split("#split#") ?? "";
    };

    let description_data = {
      no_split: description,
      split: {
        first: splitText(description)?.[0],
        rest: splitText(description)?.slice(1)?.join(" "),
      },
    };

    const renderContact = () => {
      if (is_made_for_you) {
        return (
          <div
            className={`mx-auto mt-[4rem] flex w-fit flex-col items-center justify-center border px-7 py-5 !text-center shadow-[10px_10px_5px_0px_rgba(0,0,0,0.75)]`}
          >
            <h3 className={`text-2xl font-bold uppercase`}>
              Get in Touch With Designer
            </h3>
            <p className={`mt-2 text-[1.1rem]`}>
              Feel free to contact us via e-mail to discuss your dream shoes.
            </p>
            <Link href={`mailto:info@alesari.com`} className="!mx-auto">
              <Button className={`!mt-5 w-full !text-lg `}>Contact us</Button>
            </Link>
          </div>
        );
      }
      return null;
    };

    return (
      <div className={``}>
        {image && (
          <Image
            src={image}
            alt={name}
            className={`w-full`}
            width={0}
            quality={100}
            height={0}
            sizes={`100vw`}
          />
        )}
        <div className={`mt-10 grid grid-cols-2 gap-10 `}>
          <div
            className={`${gallery && gallery?.length === 0 ? "col-span-2" : "col-span-2 lg:col-span-1"}`}
          >
            <h1
              className={`active-selected text-2xl font-bold uppercase`}
              data-aos={`fade-up`}
            >
              {name}
            </h1>
            <p
              data-aos={`fade-left`}
              className={`mt-5 !font-sans text-[1.2rem] text-black`}
              dangerouslySetInnerHTML={{
                __html:
                  is_bridal || splitText(description)?.length >= 2
                    ? description_data?.split?.first
                    : description_data?.no_split,
              }}
            />
          </div>
          <div
            data-aos={`fade-down`}
            className={`${gallery && gallery?.length === 0 ? "col-span-2" : "col-span-2 lg:col-span-1"}`}
          >
            {gallery && gallery?.length > 0 && (
              <Swiper
                className={`categoryImageSwiper !w-full`}
                modules={[Scrollbar]}
                scrollbar={{
                  draggable: true,
                }}
              >
                {gallery.map(({ image }, i) => {
                  return (
                    <SwiperSlide
                      key={`gallery-image-${i}`}
                      className={`relative w-full overflow-hidden`}
                    >
                      <Image
                        src={image}
                        alt={name}
                        className={`m-auto h-auto w-full`}
                        width={0}
                        height={0}
                        sizes={`100vw`}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
        {children}

        {(is_bridal || splitText(description)?.length >= 2) && (
          <p
            className={`mt-10 text-[1.1rem]`}
            dangerouslySetInnerHTML={{ __html: description_data?.split?.rest }}
          />
        )}
        {(is_bridal || is_alesari_women) && (
          <div className={`flex items-center justify-center`}>
            <Link
              className={``}
              href={is_bridal ? `/page/made-for-you` : `/high-heels`}
            >
              <Button className={`!mt-[4rem]  !px-12 !text-lg`}>
                {is_bridal ? "Made For You" : "Shop"}
              </Button>
            </Link>
          </div>
        )}
        {renderContact()}
      </div>
    );
  }
};

export const Conditions = ({ slug }) => {
  const { data: conditions } = useLandingPagesConditions({ slug });
  if (conditions) {
    const { items } = conditions;

    const [swiper, setSwiper] = useState(null);

    const handleSwiperSlideNext = (swiper) => {
      swiper?.slideNext();
    };

    return (
      <>
        {items && items?.length > 0 && (
          <>
            <div className={`flex items-center justify-between`}>
              <h3
                className={`active-selected mb-5 mt-[5rem] text-2xl font-bold uppercase`}
              >
                Bridal Collection
              </h3>
              {items?.length > swiper?.slidesPerView && (
                <i
                  onClick={() => {
                    handleSwiperSlideNext(swiper);
                  }}
                  className={`fa fa-solid fa-chevron-right cursor-pointer rounded-full bg-black px-2.5 py-1.5 text-base text-white hover:bg-black/70`}
                />
              )}
            </div>
            <Swiper
              rewind={true}
              onInit={(swiper) => setSwiper(swiper)}
              className={`relative !w-full`}
              slidesPerView={1.5}
              spaceBetween={10}
              breakpoints={{
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3.5,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4.5,
                  spaceBetween: 40,
                },
              }}
            >
              {items?.map(({ id }) => {
                return (
                  <Suspense
                    key={`thumb-${id}`}
                    fallback={
                      <div
                        className={`col-span-1 aspect-2/3 animate-pulse bg-slate-300`}
                      />
                    }
                  >
                    <SwiperSlide key={`swiper-slide-${id}`}>
                      <Thumb
                        id={id}
                        categoryId={"*"}
                        refreshWishlist={() => {}}
                      />
                    </SwiperSlide>
                  </Suspense>
                );
              })}
            </Swiper>
          </>
        )}
      </>
    );
  }
};
