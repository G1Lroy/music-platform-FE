

import LibraryItem from "@/components/LibraryItem";
import LikeButton from "@/components/LikeButton";
import Loader from "@/components/UI/Loader";
import searchPageStore from "@/store/searchPage";

interface SearchContentProps {}

const SearchContent: React.FC<SearchContentProps> = () => {
  const { isSearchLoading, displayedTracks } = searchPageStore();

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {!displayedTracks.length ? (
        <>
          {isSearchLoading && <Loader className="mt-4 w-5 h-5 border-2 border-white" />}
          {!isSearchLoading && <div className="text-neutral-400">No tracks found.</div>}
        </>
      ) : (
        displayedTracks.map((track) => (
          <div key={track._id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <LibraryItem track={track} key={track._id} />
            </div>
            <LikeButton />
          </div>
        ))
      )}
    </div>
  );
};

export default SearchContent;
