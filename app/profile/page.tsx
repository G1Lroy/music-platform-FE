"use client";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { GH_getTokenLocal, getUserSession } from "@/utils/session";
import userStore from "@/store/user";
import { useEffect } from "react";
import Header from "@/components/header/Header";
import Button from "@/components/UI/Button";
import Loader from "@/components/UI/Loader";
import uiStore from "@/store/ui";
import ghProfileStore from "@/store/ghProfile";

const Profile = () => {
  const router = useRouter();
  const { isLogin, loginResponse, isUserLoading, fetchProfileInfo, userProfile, userProfileLoading, fetchDeleteUser } =
    userStore();
  const { isFirstRendeProfile, setІsFirstRendeProfile } = uiStore();
  const { profile, ghProfileLoading, fetchGhProfile } = ghProfileStore();

  useEffect(() => {
    if (!isLogin) {
      router.replace("/");
      return;
    }
    if (!isFirstRendeProfile) return;
    makeFetchAction();
    setІsFirstRendeProfile(false);
    
  }, [isLogin]);

  const makeFetchAction = () => {
    if (getUserSession()) {
      const { access_token, id } = loginResponse;
      fetchProfileInfo(access_token, id);
      return;
    }
    if (GH_getTokenLocal()) {
      const token = GH_getTokenLocal()!;
      fetchGhProfile(token);
      return;
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
            {isLogin ? "Account Settings" : "Redirect to homepage, user must be logged"}
          </h1>
          <div>
            {(userProfileLoading || !isLogin || ghProfileLoading) && (
              <div>
                <Loader className="w-5 h-5 border-2 border-white" />
              </div>
            )}

            {isLogin && (
              <>
                {userProfile._id && (
                  <div className="bg-black p-2 rounded-md flex flex-col gap-y-3 max-w-md">
                    <p>Email: {userProfile.email}</p>
                    <p>Id: {userProfile._id}</p>
                    {!isUserLoading && (
                      <Button
                        onClick={() => {
                          const { _id } = userProfile;
                          const { access_token } = loginResponse;
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

                {profile.login && (
                  <div className="bg-black p-2 rounded-md flex items-center  gap-x-3 max-w-md">
                    <img
                      loading="lazy"
                      className="w-[80px] h-[80px] rounded-md"
                      src={profile.avatar}
                      alt="Github avatar"
                    />
                    <div className="flex flex-col gap-y-1 w-full">
                      <p>Github user: {profile.login}</p>
                      <p>
                        Github profile:{" "}
                        <a className="hover:underline" href={profile.profile_url}>
                          {profile.profile_url}
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
