"use client";
import { get as GET } from "@/_api/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import { useEffect } from "react";
import aos from "aos";
export const Designer = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["designer"],
    queryFn: async () => {
      return GET(`/landing-pages/basic-data/discover-the-designer`).then(
        (res) => res?.payload,
      );
    },
  });
  useEffect(() => {
    aos.init({
      once: true,
      mirror: false,
      offset: 50,
      duration: 800,
    });
  }, []);
  if (data) {
    const { name, description } = data;

    return (
      <Layout className={`mt-5 !font-sans max-md:mb-20 lg:mt-20`}>
        <h1
          data-aos={`fade-up`}
          className={`active-selected text-2xl font-bold uppercase`}
        >
          {name}
        </h1>
        <div
          data-aos={`fade-right`}
          className={`mt-10 grid grid-cols-2 gap-10 lg:gap-20`}
        >
          <div className={`col-span-2 lg:col-span-1`}>
            <p
              className={`font-sans text-[1.2rem]`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <div className={`col-span-2 max-lg:row-start-1 lg:col-span-1`}>
            <Image
              data-aos={`fade-left`}
              src={`/designer/designer.jpg`}
              alt={name}
              className={`m-auto h-auto w-full`}
              width={0}
              height={0}
              sizes={`100vw`}
            />
          </div>
        </div>
      </Layout>
    );
  }
};
