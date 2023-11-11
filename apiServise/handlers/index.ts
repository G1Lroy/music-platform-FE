import { delay } from "@/utils";
import { GithubServise } from "../github";
import { gitHubProfileT } from "@/store/userStore";

// export type FetchFnArgs = {
//   token: string;
// };

export const fetchGithubProfile = async (token: string) => {
  try {
    await delay(1500);
    const data = await GithubServise.getProfileData(token);
    const profile: gitHubProfileT = {
      login: data.login,
      avatar: data.avatar_url,
      profile_url: data.html_url,
    };
    return profile;
  } catch (error) {
    return error;
  }
};
