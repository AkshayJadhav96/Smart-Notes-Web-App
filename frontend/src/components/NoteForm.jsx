import { useEffect, useState } from "react";

const NoteForm = ({createNote,editNote,editingNote,setEditingNote}) => {

  const initialFormData = {
    title : "",
    content : "",
    category : "Study"
  }

  const initialErrors = {
    title: "",
    content: "",
    category: ""
  }

  const [formData, setFormData] = useState(editingNote ? editingNote : initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  
  const handleDataChange = (e) => {
    const field = e.target.name
    const value = e.target.value

    setFormData(prevData => ({
      ...prevData,[field]:value
    }))
  }

  const validateForm = () => {
    const newErrors = {};

    if (formData.title.trim().length < 2) {
        newErrors.title = "Title must be at least 2 characters.";
    }

    if (formData.content.trim().length >= 500 || formData.content.trim().length < 5){
        newErrors.content = "Content should be less than 500 characters and more than 4";
    }

    return newErrors;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const validationErrors = validateForm();

    if(Object.keys(validationErrors).length>0){
      setErrors(validationErrors);
      return;
    }

    setErrors(initialErrors);

    editingNote ? editNote(formData.id,formData) : createNote(formData);
    setFormData(initialFormData);
    setEditingNote(null);
  }

  useEffect(() => {
      if(editingNote){
          setFormData(editingNote);
      }
  }, [editingNote]);

  return (
    <div className="sticky top-28 w-full rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Note Editor</p>
        <h1 className="mb-6 text-3xl font-black tracking-tight text-slate-950">Create a note</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Title</label>
            <input value={formData.title} onChange={handleDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="text" name="title"/>
             {errors.title && (
              <p className="text-sm font-medium text-rose-500">
                  {errors.title}
              </p>
            )}
            </div>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Category</label>
            <select name="category" value={formData.category} onChange={handleDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100'>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
            </select>
            </div>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Content</label>
            <textarea value={formData.content} onChange={handleDataChange} className='min-h-40 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="text" name="content"/>
             {errors.content && (
              <p className="text-sm font-medium text-rose-500">
                  {errors.content}
              </p>
            )}
            </div>
            <button type='submit' className='rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-indigo-700'>{editingNote ? `Edit Note` :`Submit Note`}</button>
        </form> 
    </div>
  )
}

export default NoteForm
