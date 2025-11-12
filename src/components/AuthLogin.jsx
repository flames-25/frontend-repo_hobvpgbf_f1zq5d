import { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AuthLogin({ onSuccess }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try{
      const res = await fetch(`${baseUrl}/api/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if(!res.ok){ setError(data.detail || 'Login failed'); setLoading(false); return }
      localStorage.setItem('paylink_token', data.token)
      onSuccess?.(data)
    }catch(err){ setError('Network error') } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" required />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" required />
      {error && <p className="text-red-200 text-sm">{error}</p>}
      <button disabled={loading} className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-600 font-semibold shadow-lg shadow-blue-600/30 disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
    </form>
  )
}
