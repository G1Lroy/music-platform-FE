import { UploadFormValuesT } from "@/components/UploadForm";
import axios from "axios";

export class tracksServise {
  static async uploadTrack(values: FormData) {
    const response = await axios.post("http://localhost:5000/tracks", values);
    return response;
  }
}
