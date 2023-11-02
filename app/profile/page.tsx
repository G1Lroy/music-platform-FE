"use client";

import { AuthServise } from "@/apiServise/auth";
import Header from "@/components/Header";
import Loader from "@/components/UI/Loader";
import userStore from "@/store/userStore";
import { delay } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const {
    isLogin,
    loginUserResponse,
    isUserLoading,
    setIsUserLoading,
    setProfileUserResponse,
    profileUserResponse,
  } = userStore();

  useEffect(() => {
    if (!isLogin) {
      router.replace("/");
      return;
    }
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      setIsUserLoading(true);
      await delay(1500);
      const response = await AuthServise.getProfileInfo(loginUserResponse.access_token!);
      setProfileUserResponse(response.data);
    } catch (error) {
      //@ts-ignore
      toast.error(error.message);
    } finally {
      setIsUserLoading(false);
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
          <h1 className="text-white text-3xl font-semibold">Account Settings</h1>
          <div>
            {isUserLoading ? (
              <Loader className="w-5 h-5 border-2 border-white" />
            ) : (
              <div>
                <p>Email: {profileUserResponse.email}</p>
                <p>Id: {profileUserResponse.id}</p>
                {/* ADD DELETE ACCOUT */}
              </div>
            )}
          </div>
        </div>
      </Header>
    </div>
  );
};

export default Profile;
