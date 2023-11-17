export interface IGhProfile {
  profile: ghProfileT;
  ghProfileLoading: boolean;
  fetchGhProfile: (token: string) => Promise<void>;
  fetchGhToken: (token: string) => Promise<void>;
  ghLogout: () => void;
  setGhProfileLoading: (flag: boolean) => void;
}
export type ghProfileT = {
  avatar: string;
  login: string;
  profile_url: string;
};
