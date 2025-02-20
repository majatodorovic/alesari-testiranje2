import { HomepageHero } from "@/_components/homepage/homepage-hero";
import { StaticBanners } from "@/_components/shared/static-banners";
import { RecommendedProducts } from "@/_components/homepage/recommended-products";
import { HomepageSecondBanner } from "@/_components/homepage/homepage-second-banner";
import { asyncFunctions } from "@/lib/async-functions";
import { BigBanner } from "@/_components/homepage/big-banner";
import { InstagramPosts } from "@/_components/homepage/instagram-posts";
import { get } from "@/_api/api";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions";

const Homepage = async () => {
  const {
    getBannersDesktop,
    getBannersMobile,
    getBigBanner,
    getFifthHomepageBanner,
    getFirstHomepageBanner,
    getFourthHomepageBanner,
    getSixthHomepageBanner,
    getSecondHomepageBanner,
    getThirdHomepageBanner,
    getRecommendedProducts,
    getInstagramPosts,
    getAlesariWomanMobile,
  } = asyncFunctions;

  const bannersDesktop = await getBannersDesktop();
  const bannersMobile = await getBannersMobile();
  const firstBanner = await getFirstHomepageBanner();
  const recommendedProducts = await getRecommendedProducts();
  const secondBanner = await getSecondHomepageBanner();
  const thirdBanner = await getThirdHomepageBanner();
  const fourthBanner = await getFourthHomepageBanner();
  const fifthBanner = await getFifthHomepageBanner();
  const sixthBanner = await getSixthHomepageBanner();
  const bigBanner = await getBigBanner();
  const alesari_woman_mobile = await getAlesariWomanMobile();

  const base_url = headers()?.get("x-base_url");
  const schema = generateOrganizationSchema(base_url);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        className={`m-0`}
      />
      <HomepageHero
        banners={{
          desktop: bannersDesktop,
          mobile: bannersMobile,
        }}
      />
      {firstBanner && (
        <StaticBanners
          banner={firstBanner}
          isAnchored={true}
          type={`bold_first`}
          element_id={`the-art-of-alesari`}
          overlay_id={`the-art-of-alesari-overlay`}
        />
      )}
      {recommendedProducts?.length > 0 && (
        <RecommendedProducts products={recommendedProducts} />
      )}
      {secondBanner && <HomepageSecondBanner banner={secondBanner} />}
      {thirdBanner && (
        <StaticBanners
          banner={thirdBanner}
          className={`md:-mt-20 md:!pt-0`}
          isAnchored={false}
          type={`bold_last`}
          element_id={`made-for-you`}
          overlay_id={`made-for-you-overlay`}
        />
      )}
      {bigBanner && (
        <BigBanner
          banner={{
            desktop: bigBanner,
            mobile: alesari_woman_mobile,
          }}
        />
      )}

      {fourthBanner && (
        <StaticBanners
          banner={fourthBanner}
          isAnchored={false}
          type={`bold_last`}
          invert
          className={`max-md:pt-[4rem]`}
          element_id={`discover-the-designer`}
          overlay_id={`discover-the-designer-overlay`}
        />
      )}
      {fifthBanner && (
        <StaticBanners
          banner={fifthBanner}
          isAnchored={false}
          type={`bold_first`}
          element_id={`customer-care`}
          overlay_id={`customer-care-overlay`}
        />
      )}
      {sixthBanner && (
        <StaticBanners
          banner={sixthBanner}
          isAnchored={false}
          type={`bold_first`}
          invert
          element_id={`connect-with-us`}
          overlay_id={`connect-with-us-overlay`}
        />
      )}
      <InstagramPosts />
    </main>
  );
};

export default Homepage;

export const revalidate = 60;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Alesari",
    description: data?.meta_description ?? "Alesari",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Alesari",
      description: data?.social?.share_description ?? "Alesari",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "",
          width: 800,
          height: 600,
          alt: "Alesari",
        },
      ],
      locale: "en_US",
    },
  };
};
