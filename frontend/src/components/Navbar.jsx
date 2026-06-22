import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const {token,logout,userName} = useContext(AuthContext);

  return (
    <div className="sticky top-0 z-20 border-b border-white/60 bg-white/80 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
    <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className='flex items-center justify-between gap-6'>
      <Link className='text-xl font-black tracking-tight text-slate-950' to="/">SmartNotes</Link>
      <div className='flex flex-wrap gap-2 text-sm font-semibold text-slate-600'>
      <Link className='rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950' to="/">Home</Link>
      <Link className='rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950' to="/notes">Notes</Link>
      {token===null && <Link className='rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950' to="/login">Login</Link>}
      {token===null && <Link className='rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950' to="/register">Register</Link>}
      </div>
      </div>
      <div className='flex items-center gap-3 text-sm font-medium text-slate-500'>
      <span className='rounded-full bg-slate-100 px-4 py-2'>{token ? `Welcome ${userName}` : "Not Logged In"}</span>
      {token && <button onClick={() => logout()} className='rounded-full bg-rose-500 px-4 py-2 font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600' >Logout</button>}
      </div>
    </nav>
    </div>
  )
}

export default Navbar
