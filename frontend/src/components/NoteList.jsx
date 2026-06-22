import NoteCard from './NoteCard'

const NoteList = ({notes,deleteNote,setEditingNote}) => {
  if(notes.length==0) return  <div className='rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-6 text-center shadow-sm backdrop-blur sm:rounded-[2rem] sm:p-10'><p className='text-lg font-bold text-slate-800'>No notes found</p><p className='mt-2 text-sm text-slate-500 sm:text-base'>Create your first note or try a different category.</p></div>
  return (
    <div className='grid gap-4 sm:grid-cols-2 sm:gap-5 2xl:grid-cols-3'>
        {notes.map((note) => {
          return <NoteCard key={note.id} note={note} deleteNote={deleteNote} setEditingNote={setEditingNote}/>
        })}
    </div>
  )
}

export default NoteList
