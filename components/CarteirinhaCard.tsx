'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export interface CarteirinhaData {
  id: number
  name: string
  rgm: string
  course: string
  status: string
}

export function CarteirinhaCard({ data }: { data: CarteirinhaData }) {
  const [qrSrc, setQrSrc] = useState<string>('')

  useEffect(() => {
    const info = JSON.stringify({ rgm: data.rgm, name: data.name, course: data.course, status: data.status })
    QRCode.toDataURL(info, { margin: 1, width: 220 })
      .then(setQrSrc)
      .catch((err) => {
        console.error('Erro geração QR:', err)
      })
  }, [data])

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">RGM</p>
          <p className="text-lg font-semibold text-white">{data.rgm}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Situação</p>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${data.status.toLowerCase() === 'ativo' ? 'bg-green-500/10 text-green-200' : 'bg-red-500/10 text-red-200'}`}>
            {data.status}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Nome</p>
          <p className="text-base font-medium text-white">{data.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Curso</p>
          <p className="text-base font-medium text-white">{data.course}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center rounded-3xl bg-black/50 p-4">
        {qrSrc ? (
          <img src={qrSrc} alt={`QR Code ${data.rgm}`} className="h-44 w-44 rounded-2xl bg-white p-2" />
        ) : (
          <div className="h-44 w-44 rounded-2xl bg-white/10" />
        )}
      </div>
    </div>
  )
}
