export type TrackT = {
  title: string;
  artist: string;
  audio: string;
  image: string;
  comments: CommentT[];
  listenCoiunt: number;
  _id: string;
};
export type CommentT = {
  text: string;
  userName: string;
  track_id: string;
};
export interface ITracksPage {
  tracks: TrackT[];
  isTracksLoading: boolean;
  reRenderPage: boolean;
  setReRenderPage: () => void;
  fetchTracks: () => Promise<void>;

}
