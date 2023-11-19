import { FormEvent } from "react";
import searchPageStore from "@/store/searchPage";
import Button from "@/components/UI/Button";
import { MdClear } from "react-icons/md";

const SearchForm = () => {
  const { searhParam, setSearchParam, fetchTracksByQuery } = searchPageStore();
  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searhParam) return;
    fetchTracksByQuery(searhParam);
    setSearchParam("");
  };

  return (
    <>
      <form className="flex flex-col gap-y-3 relative" onSubmit={(e) => searchHandler(e)}>
        <div onClick={() => setSearchParam("")} className="absolute right-2 top-[10px] cursor-pointer hover:text-black">
          <MdClear size={20} />
        </div>
        <input
          className="w-full focus:outline-none bg-neutral-700 px-3 py-2 rounded-md hover:bg-neutral-800 transition"
          placeholder="What do you want to listen to?"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searhParam}
        />
        <Button className="cursor-pointer w-max rounded-md" disabled={!searhParam} type="submit">
          search
        </Button>
      </form>
    </>
  );
};

export default SearchForm;
