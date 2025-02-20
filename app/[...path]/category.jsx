import CategoryProduct from "@/app/[...path]/page";
import { CategoryProducts, SingleCategory } from "@/_components/CategoryPage";

export const Category = ({
  params: { path },
  searchParams: { strana, sort: sortURL, filters },
}) => {
  const slug = path[path?.length - 1];
  const sort = (sortURL ?? "_")?.split("_");
  const sortField = sort[0];
  const sortDirection = sort[1];

  const page = Number(strana) > 0 ? Number(strana) : 1;

  const filters_tmp = filters?.split("::")?.map((filter) => {
    const [column, selected] = filter?.split("=");
    const selectedValues = selected?.split("_");
    return {
      column,
      value: {
        selected: selectedValues,
      },
    };
  });

  return (
    <>
      <SingleCategory slug={slug} path={path} />
      <CategoryProducts
        filters={filters_tmp}
        slug={slug}
        sortDirection={sortDirection}
        sortField={sortField}
        strana={page}
        isSection={false}
      />
    </>
  );
};
