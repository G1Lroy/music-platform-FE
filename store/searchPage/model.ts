import { TrackT } from "../tracksPage/model";

export interface IsearhPage {
  isSearchLoading: boolean;
  searhParam: string;
  displayedTracks: TrackT[];
  setSearchParam: (searchQuery: string) => void;
  fetchTracksByQuery: (searchQuery: string) => Promise<void>;
  resetTracks: () => void;
  filterTracksById: (data: { _id: string }[]) => void;
}
