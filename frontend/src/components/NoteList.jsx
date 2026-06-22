import NoteCard from './NoteCard'

const NoteList = ({notes,deleteNote,setEditingNote}) => {
  if(notes.length==0) return  <div className='rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-sm backdrop-blur'><p className='text-lg font-bold text-slate-800'>No notes found</p><p className='mt-2 text-slate-500'>Create your first note or try a different category.</p></div>
  return (
    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {notes.map((note) => {
          return <NoteCard key={note.id} note={note} deleteNote={deleteNote} setEditingNote={setEditingNote}/>
        })}
    </div>
  )
}

export default NoteList
