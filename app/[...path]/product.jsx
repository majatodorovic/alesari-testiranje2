import ProductGallery from "@/_components/Product/ProductGallery/ProductGallery";
import ProductData from "@/_components/Product/ProductData/ProductData";

export const Product = ({ params: { path } }) => {
  const slug_path = path[path?.length - 1];
  return (
    <main>
      <div className={`relative`}>
        <ProductGallery slug={slug_path} />
        <ProductData slug={slug_path} />
      </div>
    </main>
  );
};
