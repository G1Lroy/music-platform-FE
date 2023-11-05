import axios from "axios";

export class userServise {
  static async login(values: { email: string; password: string }) {
    const response = await axios.post("http://localhost:5000/login", values);
    return response;
  }
  static async register(values: { email: string; password: string }) {
    const response = await axios.post("http://localhost:5000/register", values);
    return response;
  }
  static async getProfileInfo(token: string, id: string) {
    const response = await axios.get("http://localhost:5000/profile/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return response;
  }
  static async deleteUser(token: string, id: string) {
    const response = await axios.delete("http://localhost:5000/profile/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    return response;
  }
}
