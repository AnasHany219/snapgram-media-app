import { Models } from "appwrite";

import Loader from "./Loader";
import GridPostList from "@/_root/pages/GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document> | undefined;
};

const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts.total > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="w-full mt-10 text-center text-light-4">No results found</p>
  );
};

export default SearchResults;
