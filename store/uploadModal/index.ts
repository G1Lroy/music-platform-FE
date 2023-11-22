import { tracksServise } from "@/apiServise/tracks";
import { delay } from "@/utils";
import toast from "react-hot-toast";
import { create } from "zustand";
import tracksPageStore from "../tracksPage";
import { uploadFormValuesT, IUploadModaL } from "./model";
import userStore from "../user";

const uploadModalStore = create<IUploadModaL>((set, get) => ({
  isFileLoading: false,
  isOpenUpload: false,
  setIsOpenUpload: (flag) => set({ isOpenUpload: flag }),
  onClose: () => set({ isOpenUpload: false }),
  setIsFileLoading: (flag) => set({ isFileLoading: flag }),
  fetchUploadTrack: async (values: uploadFormValuesT) => {
    const { loginResponse } = userStore.getState();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("artist", values.artist);
    formData.append("image", values.image!);
    formData.append("audio", values.audio!);
    formData.append("userId", loginResponse.id || "GH_USER");
    try {
      set({ isFileLoading: true });
      await delay(1000);
      const response = await tracksServise.uploadTrack(formData);
      if (response?.status === 201) {
        const { fetchTracks } = tracksPageStore.getState();
        toast.success("Track upload!");
        get().onClose();
        fetchTracks();
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
