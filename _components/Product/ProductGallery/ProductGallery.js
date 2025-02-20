"use client";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import {
  useIsMobile,
  useProductGallery,
  useProductSticker,
} from "@/_hooks/ecommerce.hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Zoom } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stickers } from "@/_components/shared/ui/stickers";
import { icons } from "@/lib/icons/icons";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import ProductGalleryLoader from "@/_components/Product/ProductGallery/ProductGalleryLoader";

const ProductGallery = ({ slug }) => {
  const { data, isLoading: isLoadingGallery } = useProductGallery({ slug });

  //fetchujemo podatke o stickeru
  const { data: sticker, isLoading: isLoadingSticker } = useProductSticker({
    slug,
  });

  const [swiper, setSwiper] = useState(null);
  const [gallerySwiper, setGallerySwiper] = useState(null);

  //pratimo koja je slika selektovana i prikazujemo je u velikom swiperu
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNextSlide = (swiper) => {
    swiper?.slideNext();
  };
  const handlePrevSlide = (swiper) => {
    swiper?.slidePrev();
  };

  const is_loading = isLoadingGallery || isLoadingSticker;

  const is_mobile = useIsMobile();

  const router = useRouter();

  const renderChevronsModal = () => {
    let images_length = data?.length;

    if (images_length > 1) {
      return (
        <div
          className={`absolute bottom-3 z-[5] mx-auto flex w-full items-center justify-center gap-5 max-md:bottom-0 max-md:bg-white max-md:py-2`}
        >
          <span
            onClick={() => {
              handlePrevSlide(swiper);
            }}
            className={`cursor-pointer rounded-full p-1.5 hover:bg-black hover:text-white`}
          >
            {icons.chevron_left}
          </span>

          <span
            onClick={() => {
              handleNextSlide(swiper);
            }}
            className={`cursor-pointer rounded-full p-1.5 hover:bg-black hover:text-white`}
          >
            {icons.chevron_right}
          </span>
        </div>
      );
    }

    return null;
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
          </div>{" "}
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

  if (is_loading) {
    return <ProductGalleryLoader />;
  } else {
    return (
      <>
        <div className={`relative`}>
          <button
            onClick={() => router.back()}
            className="absolute left-[1rem] top-[1.4rem] z-10 flex items-center gap-3"
          >
            <Image src="/icons/chevron.png" width={5} height={2} alt="" />{" "}
            <span className={`active-hover font-sans`}>Back</span>
          </button>
          <div className={`relative !h-full !w-full`}>
            <Swiper
              onSwiper={(swiper) => setGallerySwiper(swiper)}
              spaceBetween={0}
              slidesPerView={1.5}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  freeMode: true,
                },
                768: {
                  freeMode: false,
                  slidesPerView: 3,
                },
                1440: {
                  slidesPerView: 3.5,
                },
              }}
              rewind={true}
              freeMode={false}
              watchSlidesProgress={true}
              modules={[FreeMode, Zoom]}
              className={`!relative !h-full !w-full `}
            >
              {data?.map(
                (
                  {
                    image,
                    image_data: {
                      file_data: { width, height },
                      descriptions: { alt },
                    },
                  },
                  i,
                ) => {
                  return (
                    <SwiperSlide key={i}>
                      {is_mobile ? (
                        <Image
                          onClick={() => {
                            setSelectedImage(image);
                          }}
                          src={convertHttpToHttps(image)}
                          alt={alt ?? ""}
                          width={width}
                          height={height}
                          quality={100}
                          sizes={`100vw`}
                          className={`!h-auto !w-full cursor-pointer transition-all duration-500`}
                        />
                      ) : (
                        <ImageMagnifier
                          onClick={(image) => {
                            setSelectedImage(image);
                          }}
                          src={image ?? ""}
                          alt={alt ?? ` `}
                          width={width ?? 0}
                          height={height ?? 0}
                          sizes={`100vw`}
                          className={`!h-auto !w-full cursor-pointer transition-all duration-500`}
                        />
                      )}
                    </SwiperSlide>
                  );
                },
              )}
              {renderChevronsGallery()}
            </Swiper>
            <div className={`ml-4 mt-2 flex items-center gap-5`}>
              {sticker?.length > 0 &&
                (sticker ?? [])?.map(({ name }, i) => {
                  return (
                    <Stickers
                      key={i}
                      name={name}
                      className={`w-fit bg-black font-sans text-sm font-bold`}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        {selectedImage && (
          <div
            onClick={(e) => {
              if (e.currentTarget === e.target) {
                setSelectedImage(null);
              }
            }}
            className={`fixed inset-0 left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-50`}
          >
            <Swiper
              rewind
              onSwiper={(swiper) => setSwiper(swiper)}
              initialSlide={data?.findIndex(
                ({ image: img }) => img === selectedImage,
              )}
              zoom={{
                toggle: true,
                minRatio: 2,
                maxRatio: 5,
              }}
              modules={[FreeMode, Zoom]}
              className={`relative inset-0 m-auto flex max-h-full !w-full max-w-[30%] flex-col items-center justify-center max-sm:max-w-[95%]`}
            >
              {data?.map(
                (
                  {
                    image,
                    image_data: {
                      file_data: { width, height },
                      descriptions: { alt },
                    },
                  },
                  i,
                ) => {
                  return (
                    <SwiperSlide key={i}>
                      {is_mobile ? (
                        <div className={`swiper-zoom-container`}>
                          <Image
                            src={convertHttpToHttps(image)}
                            alt={alt ?? ""}
                            width={width}
                            height={height}
                            sizes={`100vh`}
                            className={`h-full w-full cursor-pointer transition-all duration-500 max-md:object-cover md:aspect-2/3`}
                          />
                        </div>
                      ) : (
                        <ImageMagnifier
                          onClick={(image) => {
                            setSelectedImage(image);
                          }}
                          src={image ?? ""}
                          alt={alt ?? ` `}
                          width={width ?? 0}
                          height={height ?? 0}
                          sizes={`100vh`}
                          className={`md:aspect-1/3h-full w-full cursor-pointer transition-all duration-500 max-md:object-cover`}
                        />
                      )}
                      <div
                        onClick={(e) => {
                          if (e.currentTarget === e.target) {
                            setSelectedImage(null);
                          }
                        }}
                        className="absolute right-[1.4rem] top-[1rem] z-[120] text-black"
                      >
                        X
                      </div>
                    </SwiperSlide>
                  );
                },
              )}
              {renderChevronsModal()}
            </Swiper>
          </div>
        )}
      </>
    );
  }
};

export default ProductGallery;

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
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
};
