"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/_components/shared/ui/button";
import Link from "next/link";
import { useIsMobile } from "@/_hooks/ecommerce.hooks";
export const ShoeDescription = () => {
  const dot_positions = {
    1: { left: "22%", top: "15%" },
    2: { left: "15%", top: "60%" },
    3: { left: "25%", top: "77%" },
    4: { left: "23%", top: "40%" },
    5: { left: "27%", top: "49%" },
    6: { left: "37%", top: "59%" },
    7: { left: "55%", top: "84.8%" },
    8: { left: "80%", top: "74%" },
  };
  const dot_descriptions = {
    1: "Gold plated ankle strap buckle",
    2: "Porcelain flower with gilt edges",
    3: "Carbon fiber heel",
    4: "Heel cushion for comfort",
    5: "Carbon fiber midsole",
    6: "Enameled Alesari logo",
    7: "24k gold plated sole",
    8: "Shoe made of leather inside and out",
  };

  const [hoveredDot, setHoveredDot] = useState({
    show: false,
    key: 1,
  });

  const is_mobile = useIsMobile();

  return (
    <>
      <div className={`relative mx-auto w-full lg:!w-[60%]`}>
        <Image
          src={"/shoes/7.jpg"}
          alt={`Alesari shoe`}
          width={0}
          height={0}
          sizes={`90vw`}
          className={`mx-auto w-full`}
        />

        {Object?.entries(dot_positions).map(([key, value]) => (
          <div
            onMouseEnter={() =>
              setHoveredDot({
                show: true,
                key: key,
              })
            }
            onMouseLeave={() =>
              setHoveredDot({
                ...hoveredDot,
                show: false,
              })
            }
            onClick={() => {
              setHoveredDot({
                show: true,
                key: key,
              });
            }}
            key={key}
            className={`absolute ${
              hoveredDot?.key === key && hoveredDot?.show
                ? `scale-150`
                : `scale-100`
            } h-4 w-4 rounded-full border border-black bg-white shadow transition-all duration-500 hover:border-white hover:bg-primary`}
            style={{ left: value.left, top: value.top }}
          ></div>
        ))}

        <div
          className={
            hoveredDot?.show
              ? `visible absolute scale-100 bg-primary px-1 py-1 text-center text-white opacity-100 shadow-md transition-all duration-500 md:px-6 md:py-3`
              : `scale-85 invisible absolute bg-primary px-1 py-1 text-center text-white opacity-0 shadow-md transition-all duration-500 md:px-6 md:py-3`
          }
          style={{
            left: is_mobile
              ? `15%`
              : `${dot_positions?.[hoveredDot?.key]?.left}` || 0,
            top: `${dot_positions?.[hoveredDot?.key]?.top}` || 0,
            transform: "translate(0%, -130%)",
          }}
        >
          <p className={`font-sans text-lg`}>
            {dot_descriptions?.[hoveredDot?.key]}
          </p>
        </div>
      </div>
      <Link
        href={`/discover-the-designer`}
        className={`mx-auto block w-fit text-center max-md:mb-[4rem]`}
      >
        <Button className={`!mx-auto !mt-5 !px-12 !text-lg`}>
          DISCOVER THE DESIGNER
        </Button>
      </Link>
    </>
  );
};
