import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import TransactionCard from '../components/TransactionCard'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Home() {
  const [balance, setBalance] = useState(0)
  const [feed, setFeed] = useState([])
  const token = localStorage.getItem('paylink_token')

  useEffect(() => {
    const load = async () => {
      if (!token) return
      const b = await fetch(`${baseUrl}/api/balance`, { headers: { Authorization: `Bearer ${token}` }})
      if (b.ok) {
        const d = await b.json(); setBalance(d.balance)
      }
      const f = await fetch(`${baseUrl}/api/transactions/feed`, { headers: { Authorization: `Bearer ${token}` }})
      if (f.ok) {
        const d = await f.json(); setFeed(d)
      }
    }
    load()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00c6a7] to-[#0072ff] text-white relative overflow-hidden">
      {/* 3D Background centered */}
      <div className="pointer-events-none absolute top-[-8vh] left-1/2 -translate-x-1/2 w-[120vw] max-w-[900px] h-[46vh]">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 pt-8 pb-28 px-4 max-w-md mx-auto">
        <div className="mt-[28vh]" />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-5 shadow-2xl">
          <p className="text-sm text-white/80">Available balance</p>
          <h1 className="text-4xl font-bold mt-1">€{balance.toFixed(2)}</h1>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <a href="/send" className="py-3 rounded-2xl text-center bg-white/20 border border-white/30 hover:bg-white/30 transition font-semibold">Send</a>
            <a href="/send?mode=request" className="py-3 rounded-2xl text-center bg-white/20 border border-white/30 hover:bg-white/30 transition font-semibold">Request</a>
          </div>
        </motion.div>

        <h3 className="mt-6 mb-3 text-white/90 font-semibold">Recent activity</h3>
        <div className="space-y-3">
          {feed.length === 0 && <p className="text-white/70 text-sm">No transactions yet.</p>}
          {feed.map((tx) => (
            <TransactionCard key={tx.id} tx={tx} />
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  )
}
