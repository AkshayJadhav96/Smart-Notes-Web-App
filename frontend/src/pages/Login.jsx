import { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { useNavigate } from "react-router-dom";


const Login = () => {
    
    const {login,isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const initialFormData = {
        email: "",
        password: "",
        rememberMe: false
    }

    const [formData, setformData] = useState(initialFormData);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormDataChange = (e) => {
        const field = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setformData(prev => ({...prev,[field]:value}));
    }

    const handleSubmission = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await loginUser(formData);

            login(response.data);
            
            setError("")
            setformData(initialFormData);

        } catch {
            setError("Invalid email or password");
        }
        finally{
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/notes");
        }
    }, [isAuthenticated]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
        <div className="w-full max-w-md rounded-4xl border border-white/80 bg-white/90 p-8 shadow-2xl shadow-slate-200/70 backdrop-blur">
        <p className="mb-2 text-center text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Welcome Back</p>
        <h1 className="mb-8 text-center text-4xl font-black tracking-tight text-slate-950">Login</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmission}>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Email</label>
            <input value={formData.email} onChange={handleFormDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="email" name='email' required minLength={8}/>
            </div>
            <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-slate-700'>Password</label>
            <input value={formData.password} onChange={handleFormDataChange} className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100' type="password" name='password' required minLength={8}/>
        
            </div>
            <div className='flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3'>
            <input checked={formData.rememberMe} onChange={handleFormDataChange} className='h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500' type="checkbox" name='rememberMe'/>
            <label className='text-sm font-semibold text-slate-700'>Remember Me</label>
            </div>
            {error!=="" && (
              <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
                  {error}
              </p>
            )}
            <button disabled={isSubmitting} type='submit' className='rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70'>{isSubmitting ? "Logging in..." : "Login"}</button>
        </form> 
    </div>
    </section>
  )
}

export default Login
