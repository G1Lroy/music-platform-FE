"use client";
import { userServise } from "@/apiServise/user";
import Header from "@/components/Header";
import Button from "@/components/UI/Button";
import Loader from "@/components/UI/Loader";
import uiStore from "@/store/uiStore";
import userStore, { gitHubProfileT } from "@/store/userStore";
import { delay } from "@/utils";
import { removeSession } from "@/utils/session";
import axios from "axios";
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
  const { isFirstRendeProfile, setisFirstRendeProfile } = uiStore();

  useEffect(() => {
    if (!isLogin) {
      router.replace("/");
      return;
    }
    const { access_token, id } = loginUserResponse;
    if (isFirstRendeProfile && loginUserResponse.id) {
      fetchProfileInfo(access_token, id);
    } else if (isFirstRendeProfile) {
      fetchGithubProfile();
    }
    setisFirstRendeProfile(false);
  }, []);

  const fetchGithubProfile = async () => {
    setIsUserLoading(true);
    const token = "Bearer" + " " + localStorage.getItem("githubAccesToken");
    try {
      const { data } = await axios.get("http://localhost:5000/auth/github/getProfile", {
        headers: {
          Authorization: token,
        },
      });
      const profile: gitHubProfileT = {
        login: data.login,
        avatar: data.avatar_url,
        profile_url: data.html_url,
      };
      setGithubProfile(profile);
    } catch (error) {
      console.log(error);
    }
    setIsUserLoading(false);
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
        removeSession();
        toast.success(response.data);
        setIslogin(false);
        router.replace("/");
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
            {isLogin ? "Account Settings" : "Please login, redirect to homepage..."}
          </h1>
          <div>
            {isUserLoading && <Loader className="w-5 h-5 border-2 border-white" />}

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
