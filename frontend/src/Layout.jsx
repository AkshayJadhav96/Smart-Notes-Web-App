import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

const Layout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(135deg,#f8fafc_0%,#fef3c7_100%)]">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
