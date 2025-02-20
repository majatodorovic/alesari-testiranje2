import { StaticPageContent } from "@/_components/static/static-page-content";
import { get } from "@/_api/api";
import { headers } from "next/headers";

const StaticPage = ({ params: { slug } }) => {
  let landing_slug = slug?.[slug?.length - 1];
  return <StaticPageContent slug={landing_slug} />;
};

export default StaticPage;

const getSEO = (slug) => {
  return get(`/landing-pages/seo/${slug}`).then(
    (response) => response?.payload,
  );
};

export const generateMetadata = async ({ params: { slug } }) => {
  const data = await getSEO(slug);

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
