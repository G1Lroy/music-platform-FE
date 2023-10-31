import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-y-auto">
      <Header className="">
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
        </div>
      </Header>
    </div>
  );
}
