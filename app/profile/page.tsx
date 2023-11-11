"use client";
import { GithubServise } from "@/apiServise/github";
import { userServise } from "@/apiServise/user";
import Header from "@/components/Header";
import Button from "@/components/UI/Button";
import Loader from "@/components/UI/Loader";
import uiStore from "@/store/uiStore";
import userStore, { gitHubProfileT } from "@/store/userStore";
import { delay } from "@/utils";
import { GH_getTokenLocal, getUserSession, removeUserSession } from "@/utils/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const router = useRouter();
  const {
    gitHubprofile,
    isLogin,
    loginUserResponse,
    isUserLoading,
    setIsUserLoading,
    setProfileUserResponse,
    profileUserResponse,
    setIslogin,
    setGithubProfile,
  } = userStore();
  const { isFirstRendeProfile, setІsFirstRendeProfile } = uiStore();

  useEffect(() => {
    if (!isLogin) {
      router.replace("/");
      return;
    }
    if (!isFirstRendeProfile) return;
    makeFetchAction();
    setІsFirstRendeProfile(false);
  }, []);

  const fetchGithubProfile = async (token: string) => {
    try {
      setIsUserLoading(true);
      await delay(1500);
      const data = await GithubServise.getProfileData(token);
      const profile: gitHubProfileT = {
        login: data.login,
        avatar: data.avatar_url,
        profile_url: data.html_url,
      };
      setGithubProfile(profile);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  };
  const fetchProfileInfo = async (token: string, id: string) => {
    try {
      setIsUserLoading(true);
      await delay(1500);
      const response = await userServise.getProfileInfo(token, id);
      setProfileUserResponse(response.data);
    } catch (error) {
      //@ts-ignore
      toast.error(error.response.data.error);
    } finally {
      setIsUserLoading(false);
    }
  };
  const fetchDeleteUser = async (token: string, id: string) => {
    try {
      setIsUserLoading(true);
      await delay(1500);
      const response = await userServise.deleteUser(token, id);
      if (response.status === 200) {
        removeUserSession();
        setIslogin(false);
        router.replace("/");
        toast.success(response.data);
      }
    } catch (error) {
      //@ts-ignore
      toast.error(error.response.data.error);
      // console.log(error.response.data.error);
    } finally {
      setIsUserLoading(false);
    }
  };
  // сделать универсальную try/catch оболочку
  const makeFetchAction = () => {
    if (getUserSession()) {
      const { access_token, id } = loginUserResponse;
      fetchProfileInfo(access_token, id);
    }
    if (GH_getTokenLocal()) {
      const token = GH_getTokenLocal()!;
      fetchGithubProfile(token);
    }
  };
  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            {isLogin ? "Account Settings" : "Redirect to homepage"}
          </h1>
          <div>
            {isUserLoading || (!isLogin && <Loader className="w-5 h-5 border-2 border-white" />)}

            {isLogin && (
              <>
                {profileUserResponse._id && (
                  <div className="bg-black p-2 rounded-md flex flex-col gap-y-3 max-w-md">
                    <p>Email: {profileUserResponse.email}</p>
                    <p>Id: {profileUserResponse._id}</p>
                    {!isUserLoading && (
                      <Button
                        onClick={() => {
                          const { _id } = profileUserResponse;
                          const { access_token } = loginUserResponse;
                          fetchDeleteUser(access_token, _id);
                        }}
                        type="button"
                        className="text-white bg-red-800 flex justify-center text-base items-center gap-x-2 w-30 px-[5px] p-0 active:scale-95 rounded-md"
                      >
                        Delete account
                        <AiOutlineDelete size={15} />
                      </Button>
                    )}
                  </div>
                )}

                {gitHubprofile.login && (
                  <div className="bg-black p-2 rounded-md flex items-center  gap-x-3 max-w-md">
                    <img
                      loading="lazy"
                      className="w-[80px] h-[80px] rounded-md"
                      src={gitHubprofile.avatar}
                      alt="Github avatar"
                    />
                    <div className="flex flex-col gap-y-1 w-full">
                      <p>Github user: {gitHubprofile.login}</p>
                      <p>
                        Github profile:{" "}
                        <a className="hover:underline" href={gitHubprofile.profile_url}>
                          {gitHubprofile.profile_url}
                        </a>
                      </p>
                      <a
                        className="bg-orange-500 rounded-md text-center hover:bg-orange-400 hover:text-black transition"
                        target="_blanc"
                        href="https://github.com/settings/applications"
                      >
                        Token settings ⚙️
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default Profile;
