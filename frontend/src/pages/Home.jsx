const Home = () => {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-5xl items-center py-6 sm:min-h-[70vh]">
      <div className="w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-2xl shadow-slate-200/70 backdrop-blur sm:rounded-[2rem] sm:p-8 lg:p-12">
        <p className="mb-4 inline-flex rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-800 sm:px-4 sm:text-sm">
          Smart Notes App
        </p>
        <h1 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Capture ideas, organize thoughts, and find notes faster.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
          A clean workspace for study, work, personal tasks, and everything else you want to remember.
        </p>
      </div>
    </section>
  )
}

export default Home