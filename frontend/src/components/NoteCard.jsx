
const NoteCard = ({note,deleteNote,setEditingNote}) => {
  return (
    <div className='group flex min-h-56 w-full flex-col rounded-[1.75rem] border border-white/80 bg-white/90 p-5 shadow-xl shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/50'>
    <div className='mb-3 text-xl font-black leading-tight text-slate-950'>
        {note.title}
    </div>

    <div className='mb-4 w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-600'>
        {note.category}
    </div>

    <div className='flex-1 whitespace-pre-wrap break-words leading-7 text-slate-600'>
        {note.content}
    </div>

    <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
    <button
        onClick={() => setEditingNote(note)}
        className='rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700 transition hover:bg-amber-200'
        >
        Edit
    </button>
    <button
        onClick={() => deleteNote(note.id)}
        className='rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-200'
        >
        Delete
    </button>
    </div>
</div>
  )
}

export default NoteCard
