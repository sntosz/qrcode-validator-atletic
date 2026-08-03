'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { DeleteCarteirinha, EditCarteirinha } from '@/actions/admin'

export interface CarteirinhaData {
  name: string
  rgm: string
  course: string
  status: 'ativo' | 'inativo'
}

export function CarteirinhaCard({ data }: { data: CarteirinhaData }) {
  const [qrSrc, setQrSrc] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(data.name)
  const [course, setCourse] = useState(data.course)
  const [status, setStatus] = useState<'ativo' | 'inativo'>(data.status)

  useEffect(() => {
    setName(data.name)
    setCourse(data.course)
    setStatus(data.status)
  }, [data])

  useEffect(() => {
    const info = JSON.stringify({ rgm: data.rgm, name: data.name, course: data.course, status: data.status })
    QRCode.toDataURL(info, { margin: 1, width: 220 })
      .then(setQrSrc)
      .catch((err) => {
        console.error('Erro geração QR:', err)
      })
  }, [data])

  const handleDelete = async () => {
    const res = await DeleteCarteirinha(data.rgm)
    if (res.sucesso) {
      window.location.reload()
    } else {
      alert(res.erro)
    }
  }

  const handleSaveEdit = async () => {
    const res = await EditCarteirinha(data.rgm, {
      name,
      course,
      status,
    })

    if (res.sucesso) {
      setIsEditing(false)
      window.location.reload()
    } else {
      alert(res.erro)
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
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

      {!isEditing ? (
        <>
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

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex-1 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black"
            >
              Editar
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Excluir
            </button>
          </div>
        </>
      ) : (
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-gray-400">Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-gray-400">Curso</label>
            <input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-gray-400">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'ativo' | 'inativo')}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-white"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="flex-1 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 rounded-xl bg-gray-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}