import axios from "axios";

export class AuthServise {
  static async login(values: { email: string; password: string }) {
    const response = await axios.post("http://localhost:5000/login", values);
    return response;
  }
  static async register(values: { email: string; password: string }) {
    const response = await axios.post("http://localhost:5000/register", values);
    return response;
  }
  static async getProfileInfo(token: string) {
    const response = await axios.get("http://localhost:5000/profile", {
      headers: { Authorization: "Bearer " + token },
    });
    return response;
  }
}
