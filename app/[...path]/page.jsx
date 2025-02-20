import { get } from "@/_api/api";
import { Category } from "./category";
import { Product } from "./product";
import { notFound, permanentRedirect as redirect } from "next/navigation";
import { headers } from "next/headers";
import { getRobots, handleCategoryRobots } from "@/_functions";

const handleData = async (slug) => {
  return await get(`/slugs/product-categories?slug=${slug}`).then(
    (res) => res?.payload,
  );
};

const fetchCategorySEO = async (slug) => {
  return await get(`/categories/product/single/seo/${slug}`).then(
    (response) => response?.payload,
  );
};

const getProductSEO = async (id) => {
  return await get(`/product-details/seo/${id}`).then(
    (response) => response?.payload,
  );
};

const defaultMetadata = {};

export async function generateMetadata({
  params: { path },
  searchParams: { filters, sort, viewed, page },
}) {
  const str = path?.join("/");
  const data = await handleData(str);
  const headersList = headers();
  let canonical = headersList?.get("x-pathname");
  switch (true) {
    case data?.status === false &&
      data?.type === null &&
      data?.id === null &&
      data?.redirect_url === false:
      return defaultMetadata;

    case data?.type === "category" &&
      data?.status &&
      data?.redirect_url === false:
      const category = await fetchCategorySEO(data?.id);

      if (category) {
        let {
          meta_title: title,
          meta_keywords: keywords,
          meta_description: description,
          meta_image: image,
          meta_canonical_link: canonical_link,
          meta_robots: robots,
          social: { share_title, share_description, share_image },
        } = category;

        return {
          title: title ?? "",
          description: description ?? "",
          keywords: keywords ?? "",
          image: image ?? "",
          alternates: {
            canonical: `${canonical_link ?? canonical}`,
          },
          openGraph: {
            title: `${share_title}` ?? "",

            description: share_description ?? "",
            images: [
              {
                url: share_image ?? "",
                width: 800,
                height: 600,
                alt: share_description ?? "",
                title: share_title ?? "",
                description: share_description ?? "",
              },
            ],
          },
          robots: handleCategoryRobots(page, filters, sort, viewed, robots),
        };
      } else {
        return defaultMetadata;
      }

    case data?.type === "product" &&
      data?.status &&
      data?.redirect_url === false:
      const productSEO = await getProductSEO(data?.id);

      let robots = getRobots(productSEO?.meta_robots);

      const image = productSEO?.meta_image ?? "";
      if (productSEO) {
        return {
          alternates: {
            canonical: `${productSEO?.meta_canonical_link ?? canonical}`,
          },
          description:
            `${productSEO?.meta_title} - ${productSEO?.meta_description}` ?? "",
          keywords: productSEO?.meta_keywords ?? "",
          openGraph: {
            title: `${productSEO?.meta_title}` ?? "",
            description: productSEO?.meta_description ?? "",
            type: "website",
            images: [
              {
                url: image,
                width: 800,
                height: 800,
                alt: productSEO?.meta_title ?? productSEO?.meta_description,
              },
            ],
          },
          robots: robots,
          title: `${productSEO?.meta_title}` ?? "",
        };
      } else {
        return defaultMetadata;
      }
  }
}
const CategoryProduct = async ({ params: { path }, params, searchParams }) => {
  const str = path?.join("/");
  const data = await handleData(str);

  switch (true) {
    case data?.type === "category" &&
      data?.status === true &&
      data?.redirect_url === false:
      return <Category params={params} searchParams={searchParams} />;
    case data?.type === "product" &&
      data?.status === true &&
      data?.redirect_url === false:
      return <Product params={params} />;
    case data?.status === false:
      return notFound();
    default:
      redirect(`/${data?.redirect_url}`);
  }
};

export default CategoryProduct;
