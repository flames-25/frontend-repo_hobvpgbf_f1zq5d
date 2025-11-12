import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TransactionCard from '../components/TransactionCard'
const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Activity(){
  const [feed, setFeed] = useState([])
  const token = localStorage.getItem('paylink_token')
  useEffect(()=>{
    const load = async () => {
      if (!token) return
      const f = await fetch(`${baseUrl}/api/transactions/feed`, { headers: { Authorization: `Bearer ${token}` }})
      if (f.ok) { const d = await f.json(); setFeed(d) }
    }
    load()
  },[token])
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00c6a7] to-[#0072ff] text-white relative">
      <div className="relative z-10 pt-12 pb-28 px-4 max-w-md mx-auto">
        <h1 className="text-3xl font-semibold">Activity</h1>
        <div className="mt-6 space-y-3">
          {feed.map((tx)=> <TransactionCard key={tx.id} tx={tx} />)}
          {feed.length===0 && <p className="text-white/80">No activity yet.</p>}
        </div>
      </div>
      <Navbar />
    </div>
  )
}
