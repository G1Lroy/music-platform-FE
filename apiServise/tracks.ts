import axios from "axios";

export class tracksServise {
  static async uploadTrack(values: FormData) {
    const response = await axios.post("http://localhost:5000/tracks", values);
    return response;
  }
  static async getTracks() {
    const response = await axios.get("http://localhost:5000/tracks");
    return response;
  }
  static async searchTracks(searchQuery: string) {
    const response = await axios.get("http://localhost:5000/tracks/search?query=" + searchQuery);
    return response;
  }
}
