import { get as GET, list as LIST } from "@/_api/api";

export const asyncFunctions = {
  getBannersDesktop: () => {
    return GET(`/banners/index_slider`).then((res) => res?.payload);
  },

  getBannersMobile: () => {
    return GET(`/banners/index_slider_mobile`).then((res) => res?.payload);
  },

  getFirstHomepageBanner: () => {
    return GET(`/banners/homepage_banner_1`).then((res) => res?.payload);
  },

  getAlesariWomanMobile: () => {
    return GET(`/banners/alesari_woman_mobile`).then((res) => res?.payload);
  },

  getRecommendedProducts: () => {
    return LIST(`/products/section/list/recommendation`).then(
      (res) => res?.payload?.items,
    );
  },

  getSecondHomepageBanner: () => {
    return GET(`/banners/homepage_banner_2`).then((res) => res?.payload);
  },

  getThirdHomepageBanner: () => {
    return GET(`/banners/homepage_banner_3`).then((res) => res?.payload);
  },

  getFourthHomepageBanner: () => {
    return GET(`/banners/homepage_banner_4`).then((res) => res?.payload);
  },

  getFifthHomepageBanner: () => {
    return GET(`/banners/homepage_banner_5`).then((res) => res?.payload);
  },

  getSixthHomepageBanner: () => {
    return GET(`/banners/homepage_banner_6`).then((res) => res?.payload);
  },

  getBigBanner: () => {
    return GET(`/banners/big_banner`).then((res) => res?.payload);
  },
  getInstagramPosts: () => {
    return GET(`/banners/instagram_posts`).then((res) => res?.payload);
  },
};
