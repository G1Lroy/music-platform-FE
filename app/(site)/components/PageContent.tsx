import Loader from "@/components/UI/Loader";
import TrackItem from "./TrackItem";
import { TrackT } from "@/store/tracksPage/model";
import playerStore from "@/store/player";

interface PageContentProps {
  tracks: TrackT[];
}

const PageContent: React.FC<PageContentProps> = ({ tracks }) => {
  const { setCurrTrack, setCurrTracksCollection, currTrack } = playerStore();
  const clickOnTrack = (track: TrackT, tracksArray: TrackT[]) => {
    if (currTrack?._id === track._id) return;
    setCurrTrack(track);
    setCurrTracksCollection(tracksArray);
  };
  return (
    <div>
      {!tracks.length ? (
        <Loader className="mt-4 w-5 h-5 border-2 border-white" />
      ) : (
        <div
          className="    grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
        >
          {tracks.map((track: TrackT) => (
            <TrackItem onClick={() => clickOnTrack(track, tracks)} key={track._id} track={track} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PageContent;
