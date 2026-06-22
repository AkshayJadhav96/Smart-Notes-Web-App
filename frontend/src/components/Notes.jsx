import { useState } from 'react';
import { useEffect } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import { editNote, getNotes, removeNote, writeNote } from '../services/notesService';

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filteredNotes =
    notes.filter(note => {
        const matchesSearch =
            note.title
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                );

        const matchesCategory =
            selectedCategory === "All" ||
            note.category === selectedCategory;

        return (
            matchesSearch &&
            matchesCategory
        );
    });
  
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try{
        const token = localStorage.getItem("token")
        const response = await getNotes(token,page);
        // console.log(response.data);
        setNotes(response.data.notes);
        setTotalPages(Math.max(1,
          Math.ceil(
            0.001+response.data.totalNotes / 10
          )
        )
        )
      }catch{
        setError("Error occured while fetching the notes");
      }
      finally{
        setLoading(false);
      }
    }
    fetchNotes();
  }, [page])

  const createNote = async (noteData) =>{
    try {
      const token = localStorage.getItem("token");
      const response = await writeNote(token,noteData);

    setNotes(prevNotes => [
      ...prevNotes,
      response.data
    ]);

    } catch {
      setError("Failed to create this note");
    }
  }

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      await removeNote(token,noteId);

      setNotes(prevNotes => 
          prevNotes.filter(
              note=>note.id!==noteId
          )
      );
      
    } catch (error) {
      console.log(error);
      setError("Failed to delete note");
    }
  };

  const updateNote = async (noteId,noteData) =>{
    try {
      const token = localStorage.getItem("token");
      const response = await editNote(token,noteId,noteData);
      setNotes(prevNotes => prevNotes.map(note => 
        note.id === noteId ? response.data : note
      ));

    } catch {
      setError("Failed to edit this note");
    }
  }

  return (
    <section className='flex flex-col gap-6 sm:gap-8'>
        <div className='rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:rounded-4xl sm:p-8'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.18em] text-amber-600 sm:text-sm sm:tracking-[0.2em]'>Your Workspace</p>
              <h1 className='mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl'>Smart Notes</h1>
              <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base'>Search, filter, create, and polish your notes in one calm dashboard.</p>
            </div>
            <div className='grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_12rem] lg:w-auto lg:grid-cols-[minmax(0,18rem)_12rem]'>
              <input className='rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100' type="text" placeholder="Search notes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <select className='rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="All">All</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {loading && <p className='mt-6 rounded-2xl bg-indigo-50 px-4 py-3 font-semibold text-indigo-700'>Loading your notes...</p>}
          {error && <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 font-semibold text-rose-700">{error}</div>}
        </div>
        <div className='grid items-start gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1fr)_24rem]'>
        <NoteList notes={filteredNotes} deleteNote={deleteNote} setEditingNote={setEditingNote}/>
        <NoteForm createNote={createNote} editNote={updateNote} editingNote={editingNote} setEditingNote={setEditingNote}/>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm sm:mt-4 sm:gap-4">
        <button className="rounded-lg border px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span className='font-medium text-slate-600'>Page {page} of {totalPages}</span>
        <button className="rounded-lg border px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
    </section>
  )
}

export default Notes;
