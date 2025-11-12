export default function TransactionCard({ tx }) {
  const isIn = tx.type === 'in' || tx.user_is_receiver
  const sign = isIn ? '+' : '-'
  const color = isIn ? 'text-emerald-500' : 'text-rose-500'
  const who = isIn ? (tx.from_label || tx.from || tx.sender || 'Unknown') : (tx.to_label || tx.to || tx.receiver || 'Unknown')
  const note = tx.message || tx.note
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/70 backdrop-blur border border-black/5 shadow-sm">
      <div>
        <p className="text-sm text-gray-800 font-medium">{who}</p>
        <p className="text-[13px] text-gray-500">{note ? note : (tx.status ? String(tx.status).toUpperCase() : '')}</p>
        <p className="text-[12px] text-gray-400 mt-0.5">{new Date(tx.created_at || Date.now()).toLocaleString()}</p>
      </div>
      <div className={`text-lg font-semibold ${color}`}>{sign}€{Number(tx.amount).toFixed(2)}</div>
    </div>
  )
}
