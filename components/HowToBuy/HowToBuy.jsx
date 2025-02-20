"use client";

import { useIsMobile } from "@/_hooks/ecommerce.hooks";
import { useRouter } from "next/navigation";
import { Layout } from "@/_components/shared/ui/layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useState } from "react";
import "swiper/css/zoom";
import { icons } from "@/lib/icons/icons";

const HowToBuyComponent = () => {
  const data = [
    {
      image: "/images/howtobuy1.jpg?001",
      desc: "At the top of the page, there is a main menu with categories and subcategories of products. When you select the desired subcategory, it will list the products it contains.",
    },
    {
      image: "/images/howtobuy2.jpg",
      desc: "When you find the appropriate product in the listed items, click on it, and a detailed product page will open.",
    },
    {
      image: "/images/howtobuy3.jpg",
      desc: "On that product page, you will find all the necessary information for purchase - photos, price, description, specifications, comments. If the product suits you and you want to buy it, you can do so by clicking the Add to Bag button.",
    },
    {
      image: "/images/howtobuy4.jpg",
      desc: "If you have decided to purchase by placing the product in the bag, clicking on the bag icon will open a page where you can empty the bag, update the bag, or proceed to checkout. After filling in personal information, choosing a delivery and a payment method, review your order and make sure all information is entered correctly.",
    },
    {
      image: "/images/howtobuy5.jpg",
      desc: "  By clicking the Order button, you have completed the ordering process on the website, and you will receive a confirmation email with all the details of your order at the email address you previously entered.",
    },
  ];

  const [swiper, setSwiper] = useState(null);
  const [gallerySwiper, setGallerySwiper] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNextSlide = (swiper) => {
    swiper?.slideNext();
  };
  const handlePrevSlide = (swiper) => {
    swiper?.slidePrev();
  };

  const renderChevronsGallery = () => {
    let images_length = data?.length;

    if (images_length > 1) {
      return (
        <>
          <div
            onClick={() => {
              handlePrevSlide(gallerySwiper);
            }}
            className={`absolute bottom-0 left-2 top-0 z-[15] my-auto flex h-fit w-fit cursor-pointer flex-col items-center rounded-full p-1.5 hover:bg-black hover:text-white`}
          >
            {icons?.chevron_left}
          </div>
          <div
            onClick={() => {
              handleNextSlide(gallerySwiper);
            }}
            className={`absolute bottom-0 right-2 top-0 z-[15] my-auto flex h-fit w-fit cursor-pointer flex-col items-center rounded-full p-1.5 hover:bg-black hover:text-white`}
          >
            {icons?.chevron_right}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Layout className={`mt-5 overflow-hidden lg:mt-20`}>
        <h1
          className={`active-selected mt-10 font-sans text-2xl font-bold uppercase`}
        >
          How to buy
        </h1>
      </Layout>
      <div className={`relative mt-[3rem]`}>
        <div className={`relative !h-full !w-full`}>
          <Swiper
            onSwiper={(swiper) => setGallerySwiper(swiper)}
            spaceBetween={0}
            slidesPerView={1.5}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                freeMode: true,
              },
              768: {
                freeMode: false,
                slidesPerView: 2,
              },
              1440: {
                slidesPerView: 2.5,
              },
            }}
            rewind={true}
            freeMode={false}
            watchSlidesProgress={true}
            modules={[FreeMode, Zoom]}
            className={`!relative !h-full !w-full `}
          >
            {data?.map((item, i) => (
              <SwiperSlide key={i} className="border-r border-black">
                <p className="mx-auto mb-5 w-[80%] text-center text-justify md:min-h-[6rem]">
                  {item?.desc}
                </p>
                <ImageMagnifier
                  src={item.image}
                  alt={item.desc}
                  width={500}
                  height={240}
                  sizes={`70vh`}
                  className={`aspect-1/3 h-full w-full cursor-pointer transition-all duration-500`}
                />
              </SwiperSlide>
            ))}
            {renderChevronsGallery()}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HowToBuyComponent;

const ImageMagnifier = ({
  src,
  width,
  height,
  alt,
  sizes,
  className,
  magnifierHeight = 300,
  magnifierWidth = 300,
  zoomLevel = 2.5,
  onClick = () => {},
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 100,
      }}
      className="h-full w-full"
    >
      <Image
        onClick={() => {
          onClick(src);
        }}
        src={src}
        width={width}
        height={height}
        sizes={sizes}
        priority={true}
        className={className}
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        alt={alt}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          opacity: "1",
          border: "1px solid lightgray",
          borderRadius: "50%",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
};
