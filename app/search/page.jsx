import SearchData from "@/_components/Search/search-data";

const Search = ({ searchParams: { query } }) => {
  return <SearchData search={query} />;
};

export default Search;

export const generateMetadata = async ({ searchParams: { query } }) => {
  return {
    title: `Search: ${query} | Alesari`,
    description: `Search for ${query}`,
    robots: {
      index: false,
      follow: false,
    },
  };
};
