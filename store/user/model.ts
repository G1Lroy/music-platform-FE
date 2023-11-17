export interface IUserProfile {
  currentUser: string;
  isLogin: boolean;
  userProfileLoading: boolean;
  isUserLoading: boolean;
  loginResponse: loginResponseT;
  userProfile: profileResponseT;
  fetchProfileInfo: (token: string, id: string) => Promise<void>;
  fetchDeleteUser: (token: string, id: string) => Promise<void>;
  setIsLogin: (flag: boolean) => void;
  setLoginUserResponse: (response: loginResponseT) => void;
  userLogout: () => Promise<void>;
  setIsUserLoading: (flag: boolean) => void;
  getCurrentUser: () => void;
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
