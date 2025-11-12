import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import ModalConfirm from '../components/ModalConfirm'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Key({ n, onKey }) {
  return (
    <button onClick={() => onKey(n)} className="rounded-2xl bg-white/70 backdrop-blur border border-black/5 text-2xl font-semibold py-4">
      {n}
    </button>
  )
}

export default function Send() {
  const params = new URLSearchParams(window.location.search)
  const mode = params.get('mode') === 'request' ? 'request' : 'send'

  const [to, setTo] = useState('')
  const [note, setNote] = useState('')
  const [amount, setAmount] = useState('0')
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem('paylink_token')

  const display = useMemo(() => Number(amount || 0).toFixed(2), [amount])

  const onKey = (n) => {
    if (n === 'del') {
      setAmount((v) => (v.length > 1 ? v.slice(0, -1) : '0'))
      return
    }
    setAmount((v) => (v === '0' ? String(n) : v + String(n)))
  }

  const submit = async () => {
    if (!token) return alert('Please log in first')
    if (mode === 'send') {
      const res = await fetch(`${baseUrl}/api/transactions/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ to, amount: Number(amount)/100, note })
      })
      const data = await res.json()
      if (res.ok) {
        alert('Payment sent')
        window.location.href = '/'
      } else {
        alert(data.detail || 'Failed to send')
      }
    } else {
      const res = await fetch(`${baseUrl}/api/transactions/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ from_user: to, amount: Number(amount)/100, note })
      })
      if (res.ok) {
        alert('Request created')
        window.location.href = '/'
      } else {
        alert('Failed to request')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00c6a7] to-[#0072ff] text-white relative">
      <div className="relative z-10 pt-12 pb-32 px-4 max-w-md mx-auto">
        <h1 className="text-3xl font-semibold">{mode === 'send' ? 'Send' : 'Request'} Money</h1>
        <div className="mt-4 space-y-3">
          <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder="@username or IBAN" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" />
          <input value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Add a note (optional)" className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 placeholder-white/70 outline-none" />
        </div>

        <div className="text-center mt-8">
          <div className="text-[44px] font-bold">€{display}</div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[1,2,3,4,5,6,7,8,9,0].map((n) => (
            <Key key={n} n={n} onKey={onKey} />
          ))}
          <button onClick={()=>onKey('del')} className="rounded-2xl bg-white/10 border border-white/30 text-lg">Del</button>
          <button onClick={()=>setOpen(true)} className="col-span-2 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-600 font-semibold shadow-lg shadow-blue-600/30">Confirm</button>
        </div>
      </div>

      <Navbar />

      <ModalConfirm open={open} amount={Number(amount)/100} to={to} note={note} onConfirm={submit} onClose={()=>setOpen(false)} />
    </div>
  )
}
