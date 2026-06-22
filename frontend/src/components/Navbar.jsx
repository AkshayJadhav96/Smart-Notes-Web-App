import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const {token,logout,userName} = useContext(AuthContext);

  return (
    <div className="sticky top-0 z-20 border-b border-white/60 bg-white/80 shadow-sm shadow-slate-200/60 backdrop-blur-xl">
    <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className='flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:w-auto lg:justify-start'>
      <Link className='text-lg font-black tracking-tight text-slate-950 sm:text-xl' to="/">SmartNotes</Link>
      <div className='flex w-full flex-wrap gap-1.5 text-sm font-semibold text-slate-600 sm:w-auto sm:gap-2'>
      <Link className='rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 sm:px-4' to="/">Home</Link>
      <Link className='rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 sm:px-4' to="/notes">Notes</Link>
      {token===null && <Link className='rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 sm:px-4' to="/login">Login</Link>}
      {token===null && <Link className='rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 sm:px-4' to="/register">Register</Link>}
      </div>
      </div>
      <div className='flex w-full flex-wrap items-center gap-2 text-sm font-medium text-slate-500 sm:gap-3 lg:w-auto lg:justify-end'>
      <span className='max-w-full truncate rounded-full bg-slate-100 px-3 py-2 text-xs sm:px-4 sm:text-sm lg:max-w-xs'>{token ? `Welcome ${userName}` : "Not Logged In"}</span>
      {token && <button onClick={() => logout()} className='rounded-full bg-rose-500 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 sm:px-4' >Logout</button>}
      </div>
    </nav>
    </div>
  )
}

export default Navbar
