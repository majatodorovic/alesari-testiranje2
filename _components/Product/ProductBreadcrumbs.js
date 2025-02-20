"use client";

import { useProductBreadcrumbs } from "@/_hooks/maximon.hooks";
import Breadcrumbs from "@/_components/shared/Breadcrumbs";

const ProductBreadcrumbs = ({ slug = "", className }) => {
  const {
    data: {
      steps,
      end: { name },
    },
  } = useProductBreadcrumbs({ slug });
  return <Breadcrumbs parents={steps} className={className} name={name} />;
};

export default ProductBreadcrumbs;
