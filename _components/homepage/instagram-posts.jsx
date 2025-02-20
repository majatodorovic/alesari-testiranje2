"use client";
import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

export const InstagramPosts = () => {
  const { data: posts } = useQuery({
    queryKey: ["instagram-posts"],
    queryFn: async () => {
      return await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=IGQWROZAkprcDB1VlQ0RGR5VHdpbjNXb3ktWTJaNVVjblR5Y05jd2E1eGxnMkZAfbjJOdUsyMVJpZAWVXMHpKM1FqdTdsU2ZA3YnpIUDRMbkVobXpzdTFvek9NQmgwaVAtNU9TZAGIxei01VHFTTWN1LW5SM2JlSm9qcG8ZD
 `,
      ).then((res) => res.json());
    },
  });

  if (posts) {
    const { data } = posts;

    return (
      <Layout>
        <div className={``}>
          <h2 className={`mx-auto mb-5 text-center font-sans text-[2rem]`}>
            Alesari daily
          </h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1.3}
            breakpoints={{
              640: {
                slidesPerView: 2.3,
              },
              768: {
                slidesPerView: 3.3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {(data ?? [])
              ?.slice(0, 4)
              ?.map(({ caption, id, media_url, permalink }) => {
                return (
                  <SwiperSlide
                    key={`post-${id}`}
                    className={`!h-auto overflow-hidden `}
                  >
                    <Link
                      href={`${permalink}`}
                      target={`_blank`}
                      className={`w-full overflow-hidden `}
                    >
                      <div
                        className={`group relative flex flex-col gap-3 overflow-hidden`}
                      >
                        <Image
                          src={convertHttpToHttps(media_url ?? "")}
                          alt={`Alesari Instagram post`}
                          key={`post-${id}`}
                          width={0}
                          height={0}
                          sizes={`100vw`}
                          quality={100}
                          className={`aspect-square w-full object-cover transition-all duration-500 hover:scale-110 hover:opacity-80`}
                        />
                      </div>
                      {caption && (
                        <p
                          className={`mt-3.5 line-clamp-2 pb-1 pt-0 font-sans font-bold`}
                        >
                          {caption}
                        </p>
                      )}
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </Layout>
    );
  }
};
