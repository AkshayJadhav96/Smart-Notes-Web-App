import { useContext, useEffect, useState } from 'react';
import { registerUser } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();

  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const initialErrors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(initialErrors);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.includes("@")){
        newErrors.email = "Please enter a valid email.";
    }

    if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword){
        newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  }

  const handleFormDataChange = (e) => {
    const field = e.target.name
    const value =  e.target.value
    setFormData(prev=> ({...prev,[field]:value}))
  }

  const handleSubmission = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if(Object.keys(validationErrors).length>0){
      setErrors(validationErrors);
      return;
    }

    setErrors(initialErrors);
    setIsSubmitting(true);

    try {
      await registerUser(formData);
      setServerError("");
      setFormData(initialFormData);
      navigate("/login");

    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed");
    } finally{
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
      if (isAuthenticated) {
          navigate("/login");
      }
  }, [isAuthenticated]);

  return (
    <section className="flex min-h-[65vh] items-center justify-center py-6 sm:min-h-[70vh]">
     <div className="w-full max-w-lg rounded-[1.5rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-slate-200/70 backdrop-blur sm:rounded-[2rem] sm:p-8">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-amber-600 sm:text-sm sm:tracking-[0.2em]">Start Organizing</p>
        <h1 className="mb-6 text-center text-3xl font-black tracking-tight text-slate-950 sm:mb-8 sm:text-4xl">Create account</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmission}>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Name</label>
            <input value={formData.name} onChange={handleFormDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="text" name='name' required minLength={2}/>
            {errors.name && (
              <p className="text-sm font-medium text-rose-500">
                  {errors.name}
              </p>
            )}
            </div>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Email</label>
            <input value={formData.email} onChange={handleFormDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="email" name='email' required minLength={8}/>
            {errors.email && (
              <p className="text-sm font-medium text-rose-500">
                  {errors.email}
              </p>
            )}
            </div>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Password</label>
            <input value={formData.password} onChange={handleFormDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="password" name='password' required minLength={8}/>
            {errors.password && (
              <p className="text-sm font-medium text-rose-500">
                  {errors.password}
              </p>
            )}
            </div>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Confirm Password</label>
            <input value={formData.confirmPassword} onChange={handleFormDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="password" name='confirmPassword' required minLength={8}/>
            {errors.confirmPassword && (
              <p className="text-sm font-medium text-rose-500">
                  {errors.confirmPassword}
              </p>
            )}
            </div>
            {serverError && (
                <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
                    {serverError}
                </p>
            )}
            <button disabled={isSubmitting} type='submit' className='rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70'>{isSubmitting ? "Registering..." : "Submit"}</button>
        </form> 
    </div>
    </section>
  )
}

export default Registration
