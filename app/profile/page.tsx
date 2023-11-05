"use client";

import { userServise } from "@/apiServise/user";
import Header from "@/components/Header";
import Button from "@/components/UI/Button";
import Loader from "@/components/UI/Loader";
import uiStore from "@/store/uiStore";
import userStore from "@/store/userStore";
import { delay } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiUserX } from "react-icons/bi";

const Profile = () => {
  const router = useRouter();
  const {
    isLogin,
    loginUserResponse,
    isUserLoading,
    setIsUserLoading,
    setProfileUserResponse,
    profileUserResponse,
    setIslogin,
  } = userStore();
  const { isFirstRendeProfile, setisFirstRendeProfile } = uiStore();

  useEffect(() => {
    if (!isLogin) {
      router.replace("/");
      return;
    }
    if (isFirstRendeProfile) {
      fetchProfileInfo();
      setisFirstRendeProfile(false);
    }
  }, []);

  const fetchProfileInfo = async () => {
    const { access_token, id } = loginUserResponse;
    try {
      setIsUserLoading(true);
      await delay(1500);
      const response = await userServise.getProfileInfo(access_token!, id);
      setProfileUserResponse(response.data);
    } catch (error) {
      //@ts-ignore
      toast.error(error.message);
    } finally {
      setIsUserLoading(false);
    }
  };
  const fetchDeleteUser = async () => {
    const { _id } = profileUserResponse;
    const { access_token } = loginUserResponse;
    try {
      setIsUserLoading(true);
      await delay(1500);
      const response = await userServise.deleteUser(access_token!, _id);
      if (response.status === 200) {
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
            {isUserLoading && <Loader className="w-5 h-5 border-2 border-white" />}
            <div>
              <p>Email: {profileUserResponse.email}</p>
              <p>Id: {profileUserResponse._id}</p>
              <Button
                onClick={fetchDeleteUser}
                type="button"
                className="text-white bg-red-800 flex justify-center items-center gap-x-2 w-30 px-[5px] py-0 active:scale-90"
              >
                Delete account
                <BiUserX size={25} />
                {isUserLoading && <Loader className="w-3 h-3 border-2 border-black" />}
              </Button>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default Profile;
