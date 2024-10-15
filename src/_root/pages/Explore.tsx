import { useEffect, useState } from "react";

import GridPostList from "./GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");

  const debounceValue = useDebounce(searchValue, 500);

  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debounceValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="w-full h-full flex-center">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="w-full h3-bold md:h2-bold">Search Posts</h2>

        <div className="flex w-full gap-2 px-4 rounded-lg bg-dark-4">
          <img
            width={24}
            height={24}
            alt="search"
            src="/assets/icons/search.svg"
          />

          <input
            type="text"
            className="w-full explore-search"
            value={searchValue}
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16 flex-between mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="gap-3 px-4 py-4 cursor-pointer flex-center bg-dark-3 rounded-xl">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            width={20}
            height={20}
            alt="filter"
            src="/assets/icons/filter.svg"
          />
        </div>
      </div>

      <div className="flex flex-wrap w-full max-w-5xl gap-9">
        {shouldShowSearchResults ? (
          <SearchResults
            searchedPosts={searchedPosts}
            isSearchFetching={isSearchFetching}
          />
        ) : shouldShowPosts ? (
          <p className="w-full mt-10 text-center text-light-4">
            End of the posts
          </p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
