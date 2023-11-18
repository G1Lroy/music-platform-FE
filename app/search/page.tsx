"use client";
import Header from "@/components/Header";
import React, { useEffect } from "react";
import SearchContent from "./components/SearchContent";
import SearchInput from "./components/SearchInput";
import searchPageStore from "@/store/searchPage";

const Search: React.FC = () => {
  const { resetTracks } = searchPageStore();

  useEffect(() => {
    resetTracks();
  }, []);
  
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
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent />
    </div>
  );
};

export default Search;
