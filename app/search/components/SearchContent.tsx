import LibraryItem from "@/components/library/LibraryItem";
import Loader from "@/components/UI/Loader";
import playerStore from "@/store/player";
import searchPageStore from "@/store/searchPage";
import { TrackT } from "@/store/tracksPage/model";

interface SearchContentProps {}

const SearchContent: React.FC<SearchContentProps> = () => {
  const { isSearchLoading, displayedTracks } = searchPageStore();
  const { setCurrTrack, setCurrTracksCollection } = playerStore();

  const handleClick = (currTrack: TrackT, tracksArray: TrackT[]) => {
    setCurrTrack(currTrack);
    setCurrTracksCollection(tracksArray);
  };
  
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
            <div className="w-full">
              <LibraryItem
                onClick={() => handleClick(track, displayedTracks)}
                className="bg-transparent"
                track={track}
                key={track._id}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchContent;
