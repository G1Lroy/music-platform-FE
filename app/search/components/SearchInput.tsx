import { FormEvent } from "react";
import searchPageStore from "@/store/searchPage";

const SearchInput = () => {
  const { searhParam, setSearchParam, fetchTracksByQuery } = searchPageStore();
  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searhParam) return;
    fetchTracksByQuery(searhParam);
    setSearchParam("");
  };

  return (
    <>
      <form className="flex flex-col gap-y-3" onSubmit={(e) => searchHandler(e)}>
        <input
          placeholder="What do you want to listen to?"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searhParam}
        />
        <button disabled={!searhParam} type="submit">
          search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
