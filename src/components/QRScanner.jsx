import { useEffect, useRef, useState } from 'react'

export default function QRScanner({ onScan }) {
  const videoRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let stream
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch (e) {
        setError('Camera permission is needed to scan QR codes')
      }
    }
    start()
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop())
    }
  }, [])

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-black">
      <video ref={videoRef} className="w-full h-full object-cover" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="w-40 h-40 border-2 border-white/80 animate-pulse rounded-xl" />
      </div>
      {error && <p className="absolute bottom-2 left-2 right-2 text-[12px] text-white/80 text-center">{error}</p>}
    </div>
  )
}
