"use client";

import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useSuspenseQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  post as POST,
  deleteMethod as DELETE,
  list as LIST,
  get as GET,
  put,
} from "@/_api/api";
import { toast } from "react-toastify";
import { useCartContext } from "@/_api/cartContext";
import Image from "next/image";
import { convertHttpToHttps } from "@/_helpers/convertHttpToHttps";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { Button } from "@/_components/shared/ui/button";

//hook za prepoznavanje mobilnih uredjaja, vraca true ili false
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

export const useEmbedVideo = (video_url, video_provider) => {
  const [embedUrl, setEmbedUrl] = useState("");

  useEffect(() => {
    const getYouTubeVideoId = (url) => {
      if (!url) return null;

      const splitByWatch = url.split("v=");
      if (splitByWatch.length > 1) {
        return splitByWatch[1].split("&")[0];
      } else {
        const splitBySlash = url.split("/");
        return splitBySlash[splitBySlash.length - 1];
      }
    };

    const getVimeoVideoId = (url) => {
      if (!url) return null;

      const splitBySlash = url.split("/");
      return splitBySlash[splitBySlash.length - 1];
    };

    let video_id;
    if (video_provider === "youtube") {
      video_id = getYouTubeVideoId(video_url);
      if (video_id) {
        setEmbedUrl(`https://www.youtube.com/embed/${video_id}`);
      } else {
        setEmbedUrl("");
      }
    } else if (video_provider === "vimeo") {
      video_id = getVimeoVideoId(video_url);
      if (video_id) {
        setEmbedUrl(`https://player.vimeo.com/video/${video_id}`);
      } else {
        setEmbedUrl("");
      }
    } else {
      setEmbedUrl("");
    }
  }, [video_url, video_provider]);

  return embedUrl;
};

export const useBannerFunctions = () => {
  const renderImage = (height, width, image) => {
    return (
      <Image
        src={convertHttpToHttps(image)}
        alt={`Alesari`}
        width={width}
        height={height}
        sizes={`100vw`}
        quality={100}
        className={`!w-full`}
        style={{ minHeight: height, maxHeight: height, minWidth: "100%" }}
      />
    );
  };

  const renderVideo = (height, image) => {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`!w-full`}
        style={{ minHeight: height, maxHeight: height, minWidth: "100%" }}
      >
        <source src={image} type="video/mp4" />
      </video>
    );
  };

  const renderVideoURL = (height, video_url, video_provider) => {
    return (
      <iframe
        src={useEmbedVideo(video_url, video_provider)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="!h-full !w-full"
        style={{ minHeight: height, maxHeight: height }}
      />
    );
  };

  const handleRender = ({
    type,
    image,
    height,
    width,
    video_url,
    video_provider,
  }) => {
    switch (type) {
      case "image":
        return renderImage(height, width, image);
      case "video":
        return renderVideo(height, image);
      case "video_link":
        return renderVideoURL(height, video_url, video_provider);
    }
  };

  return {
    handleRender,
  };
};

export const useIsSticky = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return isSticky;
};

//hook za debouncing (za search), na svaki input se resetuje timer i tek kad se neko vreme ne unosi nista se poziva funkcija
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

//hook za prepoznavanje scrolla, vraca true ili false za headerShowing i sideBarShowing
export const useScroll = () => {
  const [headerShowing, setHeaderShowing] = useState(false);
  const [sideBarShowing, setSideBarShowing] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 40) return setHeaderShowing(false);
      const currentScroll = window.scrollY;
      if (currentScroll > 250) {
        setHeaderShowing(true);
      } else {
        setHeaderShowing(false);
      }
      if (currentScroll > 1000) {
        setSideBarShowing(true);
      } else {
        setSideBarShowing(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { headerShowing, sideBarShowing };
};

//hook za proveru kolicine artikala u korpi
export const useCartBadge = () => {
  const [cart] = useCartContext();

  return useQuery({
    queryKey: ["cartBadge", cart],
    queryFn: async () => {
      return await GET("/cart/badge-count").then(
        (res) => res?.payload?.summary?.items_count ?? 0,
      );
    },
  });
};

//hook za proveru kolicine artikala u listi zelja
export const useWishlistBadge = () => {
  const [, , wishList] = useCartContext();

  return useQuery({
    queryKey: ["wishlistBadge", wishList],
    queryFn: async () => {
      return await GET("/wishlist/badge-count").then(
        (res) => res?.payload?.summary?.items_count ?? 0,
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje kategorija
export const useCategoryTree = () => {
  return useSuspenseQuery({
    queryKey: ["categoryTree"],
    queryFn: async () => {
      return await GET("/categories/product/tree").then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dodavanje u korpu, proslediti id i kolicinu
export const useAddToCart = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ id, quantity, message, type = false }) => {
      return await POST(`/cart`, {
        id_product: +id,
        quantity: 1,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: "replace",
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success(message ?? "Added to bag", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                background: "#000",
                color: "white",
              },
            });
            break;
          default:
            toast.error("Error while adding to bag", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za azuriranje kolicine artikla u korpi
export const useUpdateCartQuantity = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["updateCartQuantity"],
    mutationFn: async ({ id, quantity }) => {
      return await put(`/checkout`, {
        cart_items_id: id,
        quantity: quantity,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success("Quantity updated", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                background: "#000",
                color: "white",
              },
            });
            break;
          default:
            toast.error("Error while updating quantity", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
  });
};

//hook za brisanje iz korpe, proslediti samo id kad se poziva mutate() funckija
export const useRemoveFromCart = () => {
  const [, mutateCart] = useCartContext();

  return useMutation({
    mutationKey: ["addToCart"],
    mutationFn: async ({ id }) => {
      return await POST(`/cart`, {
        id_product: +id,
        quantity: 0,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: "calc",
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateCart();
            toast.success("Successfully deleted", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                background: "#000",
                color: "white",
              },
            });
            break;
          default:
            toast.error("Error while deleting", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dodavanje u listu zelja, proslediti samo id kad se poziva mutate() funckija
export const useAddToWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  return useMutation({
    mutationKey: ["addToWishlist"],
    mutationFn: async ({ id }) => {
      return await POST(`/wishlist`, {
        id: null,
        id_product: +id,
        quantity: 1,
        id_product_parent: null,
        description: null,
        status: null,
      }).then((res) => {
        switch (res?.code) {
          case 200:
            mutateWishList();
            toast.success("Added to wishlist", {
              position: "top-center",
              autoClose: 2000,
              style: {
                background: "#000",
                color: "white",
              },
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Error while adding to wishlist", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za briasanje iz liste zelja, proslediti samo id kad se poziva mutate() funckija
export const useRemoveFromWishlist = () => {
  const [, , , mutateWishList] = useCartContext();

  return useMutation({
    mutationKey: ["removeFromWishlist"],
    mutationFn: async ({ id }) => {
      return await DELETE(`/wishlist/${id}`).then((res) => {
        switch (res?.code) {
          case 200:
            mutateWishList();
            toast.success("Removed from wishlist", {
              position: "top-center",
              autoClose: 2000,
              style: {
                background: "#000",
                color: "white",
              },
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
          default:
            toast.error("Error while removing from wishlist", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za search, proslediti searchTerm inicijalno pri pozivu hook-a i pri pozivanju funkcije
export const useSearch = ({
  searchTerm,
  isSearchPage = false,
  limit,
  render = true,
}) => {
  switch (isSearchPage) {
    case false:
      return useQuery({
        queryKey: [{ search: searchTerm ?? "null" }],
        queryFn: async () => {
          if (searchTerm?.length >= 3) {
            return await LIST("/products/search/list", {
              search: searchTerm,
            }).then((res) => res?.payload?.items);
          }
        },
        refetchOnWindowFocus: false,
      });

    case true:
      return useSuspenseQuery({
        queryKey: [{ search: searchTerm }],
        queryFn: async () => {
          return await LIST("/products/search/list", {
            search: searchTerm,
            limit: 30,
            render: render,
          }).then((res) => res?.payload);
        },
        refetchOnWindowFocus: false,
      });

    default:
      break;
  }
};

//hook za proveru da li je artikal u listi zelja, proslediti id artikla inicijalno i pozvati refetch pri svakom dodavanju u listu zelja
export const useIsInWishlist = ({ id }) => {
  return useQuery({
    queryKey: ["isInWishlist", { id: id }],
    queryFn: async () => {
      return await GET(`/wishlist/product-in-wishlist/${id}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje svih proizvoda u listi zelja
export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist_items"],
    queryFn: async () => {
      return await LIST(`/wishlist`, { render: false }).then(
        (res) => res?.payload?.items ?? [],
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za prijavljivanje na newsletter
export const useNewsletter = () => {
  return useMutation({
    mutationKey: ["newsletter"],
    mutationFn: async ({ email }) => {
      return await POST(`/newsletter`, { email: email }).then((res) => {
        switch (res?.code) {
          case 200:
            if (
              res?.payload?.message ===
              "E-mail je već prijavljen za newsletter."
            ) {
              toast.warn(`E-mail already subscribed to the newsletter`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            } else {
              toast.success(`Successfully subscribed to the newsletter`, {
                position: "top-center",
                autoClose: 2000,
                style: {
                  background: "#000",
                },
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
            break;
          default:
            toast.error("An error occurred. Please try again", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            break;
        }
      });
    },
  });
};

//hook za dobijanje izabrane kategorije, proslediti slug kategorije
export const useCategory = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["category", { slug: slug }],
    queryFn: async () => {
      return await GET(`/categories/product/single/${slug}`).then(
        (res) => res?.payload,
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje filtera izaabrane kategorije, proslediti slug kategorije, page,limit,sort i selektovane filtere
export const useCategoryFilters = ({
  slug,
  page,
  limit,
  sort,
  selectedFilters,
}) => {
  return useMutation({
    mutationKey: [
      "categoryFilters",
      {
        slug: slug,
        page: page,
        limit: limit,
        sort: sort,
        selectedFilters: selectedFilters,
      },
    ],
    mutationFn: async ({
      slug,
      selectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
    }) => {
      return await POST(`/products/category/filters/${slug}`, {
        filters: selectedFilters,
      }).then((response) => {
        const lastSelectedFilterValues = selectedFilters?.find((item) => {
          return item?.column === lastSelectedFilterKey;
        });

        const lastSelectedFilter = availableFilters?.find((item) => {
          return item?.key === lastSelectedFilterKey;
        });

        const filterLastSelectedFromResponse = response?.payload?.filter(
          (item) => {
            return item?.key !== lastSelectedFilterKey;
          },
        );

        const indexOfLastSelectedFilter = availableFilters?.findIndex(
          (index) => {
            return index?.key === lastSelectedFilterKey;
          },
        );

        if (
          lastSelectedFilter &&
          lastSelectedFilterValues?.value?.selected?.length > 0
        ) {
          setAvailableFilters([
            ...filterLastSelectedFromResponse.slice(
              0,
              indexOfLastSelectedFilter,
            ),
            lastSelectedFilter,
            ...filterLastSelectedFromResponse.slice(indexOfLastSelectedFilter),
          ]);
        } else {
          setAvailableFilters(response?.payload);
        }
      });
    },
  });
};

//hook za dobijanje artikala iz kategorije, proslediti slug kategorije, page,limit,sort i selektovane filtere

export const useCategoryProducts = ({
  slug,
  page,
  setPage,
  limit,
  sort,
  setSelectedFilters,
  filterKey,
  setSort,
  render = true,
  setIsLoadingMore,
  isSection,
}) => {
  return useSuspenseQuery({
    queryKey: [
      "categoryProducts",
      {
        slug: slug,
        page: page,
        limit: limit,
        sort: sort,
        selectedFilters: filterKey,
        render: render,
      },
    ],
    queryFn: async () => {
      try {
        //vadimo filtere iz URL koji su prethodno selektovani i pushovani sa router.push()
        const selectedFilters_tmp = (filterKey ?? "::")
          ?.split("::")
          ?.map((filter) => {
            const [column, selected] = filter?.split("=");
            const selectedValues = selected?.split("_");
            return {
              column,
              value: {
                selected: column?.includes("cena")
                  ? [Number(selectedValues[0]), Number(selectedValues[1])]
                  : selectedValues,
              },
            };
          });

        //radimo isto za sort
        const sort_tmp = (sort ?? "_")?.split("_");
        const sortObj = {
          field: sort_tmp[0],
          direction: sort_tmp[1],
        };

        return await LIST(
          isSection
            ? `/products/section/list/${slug}`
            : `/products/category/list/${slug}`,
          {
            page: page,
            limit: limit,
            sort: sortObj,
            filters: selectedFilters_tmp?.every(
              (column) => column?.column !== "",
            )
              ? selectedFilters_tmp
              : [],
            render: render,
          },
        ).then((res) => {
          //na kraju setujemo state za filtere i sort, da znamo koji su selektovani
          if (selectedFilters_tmp?.every((column) => column?.column !== "")) {
            setSelectedFilters(selectedFilters_tmp);
          }
          setSort(sortObj);
          setIsLoadingMore(false);

          return res?.payload;
        });
      } catch (error) {
        return error;
      }
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje proizvoda na detaljnoj strani
export const useProduct = ({ slug }) => {
  return useQuery({
    queryKey: ["productBasicData", slug],
    queryFn: async () => {
      return await GET(`/product-details/basic-data/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje thumb-a
export const useProductThumb = ({ id, categoryId }) => {
  return useSuspenseQuery({
    queryKey: ["productThumb", { id: id }],
    queryFn: async () => {
      return await GET(
        `/product-details/thumb/${id}?categoryId=${categoryId}`,
      ).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje galerije na detaljnoj strani
export const useProductGallery = ({ slug }) => {
  return useQuery({
    queryKey: ["productGallery", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/gallery/${slug}`).then((res) => {
        return res?.payload?.gallery;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje breadcrumbs na detaljnoj strani
export const useProductBreadcrumbs = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productBreadcrumbs", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/breadcrumbs/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje opisa na detaljnoj strani
export const useProductDescription = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productDescription", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/description/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje stikera
export const useProductSticker = ({ slug }) => {
  return useQuery({
    queryKey: ["productSticker", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/gallery/${slug}`).then((res) => {
        return res?.payload?.stickers;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje specifikacija na detaljnoj strani
export const useProductSpecification = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["productSpecification", { slug: slug }],
    queryFn: async () => {
      return await GET(`/product-details/specification/${slug}`).then((res) => {
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje svih artikala u korpi
export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await LIST(`/cart`);
      return res?.payload ?? [];
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};

//hook za dobijanje liste landing strana
export const useLandingPages = () => {
  return useSuspenseQuery({
    queryKey: ["landingPagesList"],
    queryFn: async () => {
      return await LIST(`/landing-pages/list`).then((res) => res?.payload);
    },
  });
};

//hook za dobijanje basic content-a landing strane
export const useLandingPagesBasicData = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["landingPagesContentBasicData", { slug: slug }],
    queryFn: async () => {
      return await GET(`/landing-pages/basic-data/${slug}`).then(
        (res) => res?.payload,
      );
    },
  });
};

//hook za dobijanje basic content-a landing strane
export const useLandingPagesThumb = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["landingPagesContentThumb", { slug: slug }],
    queryFn: async () => {
      return await LIST(`/landing-pages/thumb/${slug}`).then(
        (res) => res?.payload,
      );
    },
  });
};

//hook za dobijanje basic content-a landing strane
export const useLandingPagesConditions = ({ slug }) => {
  return useSuspenseQuery({
    queryKey: ["landingPagesContentConditions", { slug: slug }],
    queryFn: async () => {
      return await LIST(`/landing-pages/conditions/${slug}`, {
        render: false,
      }).then((res) => res?.payload);
    },
  });
};

//hook za zavrsetak kupovine, proslediti formData
export const useCheckout = ({ formData, setPostErrors, setLoading }) => {
  const [cart, mutateCart] = useCartContext();
  return useMutation({
    mutationKey: [{ keys: formData, cart: cart }],
    mutationFn: async () => {
      return await POST(`/checkout/one-page`, formData)
        .then((res) => {
          setLoading(true);
          mutateCart();
          setPostErrors({
            fields: res?.response?.data?.payload?.fields ?? [],
          });
          return res?.payload;
        })
        .catch((err) => {
          return err;
        });
    },
  });
};

//hook za dobijanje info o cenama,popustima itd u korpi
export const useSummary = ({ items }) => {
  return useSuspenseQuery({
    queryKey: ["summary", { items: items }],
    queryFn: async () => {
      return await GET(`/checkout/summary`).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje info o porudzbini, proslediti order_token
export const useOrder = ({ order_token }) => {
  return useSuspenseQuery({
    queryKey: ["order", { order_token: order_token }],
    queryFn: async () => {
      return await GET(`/checkout/info/${order_token}`).then(
        (res) => res?.payload,
      );
    },
    refetchOnWindowFocus: false,
  });
};

//hook za dobijanje novih proizvoda
export const useNewProducts = ({ render = true }) => {
  return useSuspenseQuery({
    queryKey: ["newProducts"],
    queryFn: async () => {
      return await LIST(`/products/new-in/list`, {
        render: render,
      }).then((res) => res?.payload);
    },
    refetchOnWindowFocus: false,
  });
};

//hook za kontakt
export const useContact = () => {
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const formMutation = useMutation({
    mutationKey: ["contact"],
    mutationFn: async ({ form }) => {
      return await POST(`/contact/contact_page`, form).then((res) => {
        switch (res?.code) {
          case 200:
            toast.success(`Sent successfully.`, {
              position: "top-center",
              autoClose: 2000,
              style: {
                background: "#000",
                color: "white",
              },
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
          default:
            toast.error("Error while sending.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
            });
            break;
        }
      });
    },
  });

  return {
    validateEmail,
    formMutation,
  };
};

export const useImageZoom = (element_id, overlay_id) => {
  const handleImageZoomIn = () => {
    if (typeof window !== "undefined") {
      const image = document.getElementById(`${element_id}`);
      if (image) {
        image.classList.add("!scale-110");
      }
    }
  };

  const handleImageZoomOut = () => {
    if (typeof window !== "undefined") {
      const image = document.getElementById(`${element_id}`);
      if (image) {
        image.classList.remove("!scale-110");
      }
    }
  };

  const handleOverlayShow = () => {
    if (typeof window !== "undefined") {
      const overlay = document.getElementById(`${overlay_id}`);
      if (overlay) {
        overlay.classList.remove("opacity-0");
        overlay.classList.remove("invisible");
        overlay.classList.add("opacity-100");
        overlay.classList.add("visible");
      }
    }
  };

  const handleOverlayHide = () => {
    if (typeof window !== "undefined") {
      const overlay = document.getElementById(`${overlay_id}`);
      if (overlay) {
        overlay.classList.remove("opacity-100");
        overlay.classList.remove("visible");
        overlay.classList.add("opacity-0");
        overlay.classList.add("invisible");
      }
    }
  };

  const renderOverlay = (id) => {
    return (
      <div
        className={`invisible absolute bottom-0 left-0 right-0 top-0 z-[2] h-full w-full bg-black/40 opacity-0 transition-all duration-500`}
        id={`${id}`}
      ></div>
    );
  };

  return {
    handleImageZoomIn,
    handleImageZoomOut,
    handleOverlayHide,
    handleOverlayShow,
    renderOverlay,
  };
};
