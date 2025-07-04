export default function Home() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col p-4">
      <header className="my-5 flex justify-between items-center mx-auto p-4 border border-gay-100"></header>
      <div className=" border-gray-200 min-h-screen absolute custom-position-left"></div>
      <div className=" border-gray-200 min-h-screen absolute custom-position-right"></div>
      <section className="max-w-4xl mx-auto p-4  w-full mt-20">
        <div className="flex flex-col mx-auto max-w-lg">
          <div className="size-20 bg-gray-200 rounded-full mb-4"></div>
          <h1 className="text-4xl font-bold mb-3">
            Hello moi c&apos;est William <br />
            Développeur Front end junior
          </h1>
          <div className="flex gap-2 items-center mb-4">
            <div className="size-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-500">
              Actuellement à la recherche d&apos;un CDI
            </span>
          </div>
          <button className="bg-black hover:bg-black/85 cursor-pointer text-white px-8 py-4 w-full rounded-lg transition-all duration-150 ease-in-out">
            Voir mon CV
          </button>
        </div>
        <div className="relative mt-10 z-10 bg-red-300 w-full p-4 h-80">
          <div className="absolute bg-gray-400 rounded-xl w-60 h-58 -rotate-5  left-0 z-1 top-10"></div>
          <div className="absolute bg-gray-200 rounded-xl w-60 h-75 rotate-10 left-50 z-0"></div>
        </div>
      </section>
    </main>
  );
}
