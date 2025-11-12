import { motion, AnimatePresence } from 'framer-motion'

export default function ModalConfirm({ open, amount, to, note, onConfirm, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40 grid place-items-end sm:place-items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="relative z-50 w-full max-w-md mx-auto rounded-t-3xl sm:rounded-3xl overflow-hidden backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Confirm Payment</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>To: <span className="font-medium">{to}</span></p>
                {note && <p>Note: <span className="font-medium">{note}</span></p>}
              </div>
              <p className="text-4xl font-bold mt-4">€{Number(amount || 0).toFixed(2)}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={onClose} className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700">Cancel</button>
                <button onClick={onConfirm} className="py-3 rounded-xl bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30">Send</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
