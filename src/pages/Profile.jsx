import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Profile(){
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [iban, setIban] = useState('')
  const token = localStorage.getItem('paylink_token')

  useEffect(()=>{
    const load = async () => {
      if (!token) return
      const r = await fetch(`${baseUrl}/api/users/me`, { headers: { Authorization: `Bearer ${token}` }})
      if (r.ok) { const u = await r.json(); setUser(u); setUsername(u.username||''); setIban(u.iban||'') }
    }
    load()
  },[token])

  const save = async () => {
    const r = await fetch(`${baseUrl}/api/users/me`, {
      method:'PUT', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ username, iban })
    })
    if (r.ok) alert('Saved')
  }

  const register = async () => {
    const name = prompt('Name?')
    const email = prompt('Email?')
    const password = 'demo1234'
    const res = await fetch(`${baseUrl}/api/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, password })})
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('paylink_token', data.token)
      window.location.reload()
    } else {
      alert(data.detail || 'Failed')
    }
  }

  const login = async () => {
    const email = prompt('Email?')
    const password = prompt('Password?')
    const res = await fetch(`${baseUrl}/api/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password })})
    const data = await res.json()
    if (res.ok) { localStorage.setItem('paylink_token', data.token); window.location.reload() } else { alert(data.detail || 'Failed') }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00c6a7] to-[#0072ff] text-white relative">
      <div className="relative z-10 pt-12 pb-28 px-4 max-w-md mx-auto">
        <h1 className="text-3xl font-semibold">Profile</h1>

        {!token && (
          <div className="mt-6 space-x-3">
            <button onClick={register} className="px-4 py-2 rounded-xl bg-white/20 border border-white/30">Quick Register</button>
            <button onClick={login} className="px-4 py-2 rounded-xl bg-white/20 border border-white/30">Login</button>
          </div>
        )}

        {token && user && (
          <div className="mt-6 space-y-3">
            <div className="bg-white/20 border border-white/30 rounded-2xl p-4">
              <p className="text-sm text-white/80">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="@username" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" />
              <input value={iban} onChange={(e)=>setIban(e.target.value)} placeholder="IBAN" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" />
              <button onClick={save} className="py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-600 font-semibold shadow-lg shadow-blue-600/30">Save</button>
            </div>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  )
}
