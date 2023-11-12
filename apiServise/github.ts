import axios from "axios";

export class githubServise {
  static async getAccesToken(code: string) {
    const { data } = await axios.get("http://localhost:5000/auth/github/getAccess?code=" + code);
    return data;
  }
  static async getProfileData(token: string) {
    const { data } = await axios.get("http://localhost:5000/auth/github/getProfile", {
      headers: {
        Authorization: "Bearer" + " " + token,
      },
    });
    return data;
  }
  static openGithubScreen() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`
    );
  }
}
