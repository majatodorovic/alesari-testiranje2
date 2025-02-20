"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get as GET } from "@/_api/api";
import { Layout } from "@/_components/shared/ui/layout";
import Image from "next/image";
import { Button } from "@/_components/shared/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import aos from "aos";

export const AlesariWoman = () => {
  useEffect(() => {
    aos.init({
      once: true,
      mirror: false,
      offset: 50,
      duration: 800,
    });
  }, []);
  const { data } = useSuspenseQuery({
    queryKey: ["alesariWoman"],
    queryFn: async () => {
      return GET(`/landing-pages/basic-data/who-is-alesari-women`).then(
        (res) => res?.payload,
      );
    },
  });

  if (data) {
    const { name, description, image } = data;

    return (
      <Layout className={`mt-5 !font-sans lg:mt-20`}>
        <h1
          className={`active-selected text-2xl font-bold uppercase`}
          data-aos={`fade-up`}
        >
          {name}
        </h1>
        <Image
          src={image}
          alt={name}
          className={`m-auto mt-10 h-auto w-full`}
          width={0}
          height={0}
          sizes={`100vw`}
          data-aos={`fade-down`}
        />
        <p
          data-aos={`fade-up`}
          className={`mt-10 font-sans text-[1.2rem]`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className={`mt-[4rem] flex items-center justify-center`}>
          <Link href={`/high-heels`}>
            <Button className={`!px-12 !text-lg`}>Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return null;
};
