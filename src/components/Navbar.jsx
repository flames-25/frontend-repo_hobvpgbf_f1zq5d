import { Home, Send, QrCode, User2, Activity } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const tabClasses = (active) => `flex flex-col items-center justify-center gap-1 flex-1 py-2 ${active ? 'text-white' : 'text-white/70'}`

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md">
      <div className="backdrop-blur-xl bg-[#0b1b2b]/70 border border-white/10 rounded-2xl shadow-2xl shadow-blue-900/20 px-4 py-2 flex items-center">
        <Link to="/" className={tabClasses(pathname === '/')}> 
          <Home size={22} />
          <span className="text-[11px]">Home</span>
        </Link>
        <Link to="/send" className={tabClasses(pathname === '/send')}>
          <Send size={22} />
          <span className="text-[11px]">Send</span>
        </Link>
        <Link to="/activity" className={tabClasses(pathname === '/activity')}>
          <Activity size={22} />
          <span className="text-[11px]">Activity</span>
        </Link>
        <Link to="/profile" className={tabClasses(pathname === '/profile')}>
          <User2 size={22} />
          <span className="text-[11px]">Profile</span>
        </Link>
      </div>
    </nav>
  )
}
