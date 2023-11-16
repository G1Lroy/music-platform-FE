export type uploadFormValuesT = {
  title: string;
  artist: string;
  audio: File | null;
  image: File | null;
};
export interface IUploadModaL {
  isFileLoading: boolean;
  isOpenUpload: boolean;
  setIsOpenUpload: (flag: boolean) => void;
  onClose: () => void;
  setIsFileLoading: (flag: boolean) => void;
  fetchUploadTrack: (values: uploadFormValuesT) => Promise<void>;
}
