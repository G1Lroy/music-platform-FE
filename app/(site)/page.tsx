"use client";
import Header from "@/components/header/Header";
import PageContent from "./components/PageContent";
import tracksPageStore from "@/store/tracksPage";
import { useEffect } from "react";

const Home = () => {
  const { tracks, fetchTracks } = tracksPageStore();

  useEffect(() => {
    fetchTracks();
  }, []);
  
  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-y-auto">
      <Header className="">
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
        </div>
        <PageContent tracks={tracks} />
      </div>
    </div>
  );
};
export default Home;
