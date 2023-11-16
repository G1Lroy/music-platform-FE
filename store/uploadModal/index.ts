import { tracksServise } from "@/apiServise/tracks";
import { delay } from "@/utils";
import toast from "react-hot-toast";
import { create } from "zustand";
import tracksPageStore from "../tracksPage";
import { uploadFormValuesT, IUploadModaL } from "./model";

const uploadModalStore = create<IUploadModaL>((set, get) => ({
  isFileLoading: false,
  isOpenUpload: false,
  setIsOpenUpload: (flag) => set({ isOpenUpload: flag }),
  onClose: () => set({ isOpenUpload: false }),
  setIsFileLoading: (flag) => set({ isFileLoading: flag }),
  fetchUploadTrack: async (values: uploadFormValuesT) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("artist", values.artist);
    formData.append("image", values.image!);
    formData.append("audio", values.audio!);
    try {
      await delay(1000);
      set({ isFileLoading: true });
      const response = await tracksServise.uploadTrack(formData);
      if (response?.status === 201) {
        const { setReRenderPage } = tracksPageStore.getState();
        get().onClose();
        toast.success("Track uploaded");
        setReRenderPage();
      }
    } catch (error) {
      //@ts-ignore
      toast.error(response.message);
    } finally {
      set({ isFileLoading: false });
    }
  },
}));

export default uploadModalStore;
