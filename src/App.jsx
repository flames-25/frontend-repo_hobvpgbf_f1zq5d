import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Send from './pages/Send'
import Activity from './pages/Activity'
import Profile from './pages/Profile'

export default function App(){
  return (
    <div className="font-[Inter]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<Send />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div className="min-h-screen grid place-items-center"><div className="text-center"><h1 className="text-3xl font-semibold">PayLink</h1><p className="text-gray-500 mt-2">Fast. Secure. European.</p><Link className="text-blue-600 underline" to="/">Go Home</Link></div></div>} />
      </Routes>
    </div>
  )
}
