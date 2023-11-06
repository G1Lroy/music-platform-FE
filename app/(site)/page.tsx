import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import App from "next/app";

export default function Home() {
  return (
      <div className="bg-neutral-900 rounded-lg w-full h-full overflow-y-auto">
        <Header className="">
          <div className="mb-2">
            <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
              <ListItem name="Liked Songs" href="Liked" />
            </div>
          </div>
        </Header>
        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
          </div>
          <div>MAKE LIST</div>
        </div>
      </div>
  );
}
