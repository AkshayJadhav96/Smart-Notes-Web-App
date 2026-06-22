const Home = () => {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center">
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-2xl shadow-slate-200/70 backdrop-blur sm:p-12">
        <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
          Smart Notes App
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          Capture ideas, organize thoughts, and find notes faster.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          A clean workspace for study, work, personal tasks, and everything else you want to remember.
        </p>
      </div>
    </section>
  )
}

export default Home