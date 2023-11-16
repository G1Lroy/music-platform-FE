export interface IUserProfile {
  isLogin: boolean;
  deleteUserProfileMessage: string;
  userProfileLoading: boolean;
  isUserLoading: boolean;
  loginResponse: loginResponseT;
  userProfile: profileResponseT;
  fetchProfileInfo: (token: string, id: string) => Promise<void>;
  fetchDeleteUser: (token: string, id: string) => Promise<void>;
  setIsLogin: (flag: boolean) => void;
  setLoginUserResponse: (response: loginResponseT) => void;
  logout: () => Promise<void>;
  setIsUserLoading: (flag: boolean) => void;
}
export type loginResponseT = {
  email: string;
  id: string;
  access_token: string;
};
export type profileResponseT = {
  email: string;
  _id: string;
};
