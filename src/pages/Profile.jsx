import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AuthLogin from '../components/AuthLogin'
import AuthRegister from '../components/AuthRegister'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Profile(){
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [iban, setIban] = useState('')
  const [tab, setTab] = useState('login')
  const token = localStorage.getItem('paylink_token')

  const fetchMe = async () => {
    if (!token) return
    const r = await fetch(`${baseUrl}/api/users/me`, { headers: { Authorization: `Bearer ${token}` }})
    if (r.ok) { const u = await r.json(); setUser(u); setUsername(u.username||''); setIban(u.iban||'') }
  }

  useEffect(()=>{ fetchMe() },[])

  const save = async () => {
    const r = await fetch(`${baseUrl}/api/users/me`, {
      method:'PUT', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ username, iban })
    })
    if (r.ok) { await fetchMe(); alert('Saved') }
  }

  const signout = () => { localStorage.removeItem('paylink_token'); window.location.reload() }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00c6a7] to-[#0072ff] text-white relative">
      <div className="relative z-10 pt-12 pb-28 px-4 max-w-md mx-auto">
        <h1 className="text-3xl font-semibold">Profile</h1>

        {!token && (
          <div className="mt-6">
            <div className="flex gap-2 p-1 rounded-2xl bg-white/10 border border-white/20 w-fit">
              <button onClick={()=>setTab('login')} className={`px-4 py-2 rounded-xl ${tab==='login'?'bg-white/20 border border-white/30':''}`}>Login</button>
              <button onClick={()=>setTab('register')} className={`px-4 py-2 rounded-xl ${tab==='register'?'bg-white/20 border border-white/30':''}`}>Register</button>
            </div>
            <div className="mt-4 bg-white/10 border border-white/20 rounded-2xl p-4">
              {tab==='login' ? (
                <AuthLogin onSuccess={()=>window.location.reload()} />
              ) : (
                <AuthRegister onSuccess={()=>window.location.reload()} />
              )}
            </div>
          </div>
        )}

        {token && user && (
          <div className="mt-6 space-y-4">
            <div className="bg-white/20 border border-white/30 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/30 grid place-items-center text-xl font-bold">{(user.name||user.email||'P').slice(0,1).toUpperCase()}</div>
                <div>
                  <p className="text-white/90 font-semibold">{user.name||'Unnamed'}</p>
                  <p className="text-white/70 text-sm">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="@username" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" />
              <input value={iban} onChange={(e)=>setIban(e.target.value)} placeholder="IBAN" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" />
              <button onClick={save} className="py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-600 font-semibold shadow-lg shadow-blue-600/30">Save</button>
              <button onClick={signout} className="py-3 rounded-2xl bg-white/10 border border-white/30">Sign out</button>
            </div>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  )
}
