'use client'

import { FormEvent, useState } from 'react'
import Header from '@/components/header'
import BottomNavigationBar from '@/components/BottomNavigationBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { CadastrarCarteirinha } from '@/actions/cadastroCarteirinha'

export default function Register() {
  const [name, setName] = useState('')
  const [rgm, setRgm] = useState('')
  const [course, setCourse] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{tipo: 'success' | 'error', texto: string} | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    const res = await CadastrarCarteirinha({ name: name, rgm: rgm, course: course })
    setLoading(false)

    if (!res.sucesso){
        setMessage({tipo: 'error', texto: res.erro || 'Erro ao cadastrar a carteirinha'})
    } else {
        setMessage({tipo: 'success', texto: 'Carteirinha cadastrada com sucesso!'})
        setName('')
        setRgm('')
        setCourse('')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#07110d] text-white">
      <Header />

      <main className="flex flex-1 items-center justify-center px-6 py-6 md:px-10">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.8)] backdrop-blur-sm">
          <div className="mb-8 space-y-3">
            <h1 className="text-3xl font-bold">Novo Cadastro</h1>
            <p className="text-sm leading-relaxed text-gray-300">
              Preencha os dados do sócio para criar a carteirinha.
            </p>
          </div>
          {message && (
            <div className={`mb-5 p-3 rounded-xl text-sm text-center font-medium border ${
              message.tipo === 'success' 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              {message.texto}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 text-sm text-gray-300">
              <label className="block font-medium" htmlFor="name">
                Nome
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: Lucas Silva"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                disabled={loading}
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-gray-500 focus:border-green-500/60"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <label className="block font-medium" htmlFor="rgm">
                RGM
              </label>
              <Input
                id="rgm"
                type="text"
                placeholder="Ex: 111.111"
                value={rgm}
                onChange={(event) => setRgm(event.target.value)}
                required
                disabled={loading}
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-gray-500 focus:border-green-500/60"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <label className="block font-medium" htmlFor="course">
                Curso
              </label>
              <Input
                id="course"
                type="text"
                placeholder="Ex: Engenharia de Software"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                required
                disabled={loading}
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-white placeholder:text-gray-500 focus:border-green-500/60"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111] text-white hover:bg-[#222] border border-white/5 transition-all"
            >
              <Plus className="h-4 w-4" />
              {loading ? 'Salvando...' : 'Cadastrar e gerar QRCode'}
            </Button>
          </form>
        </div>
      </main>

      <BottomNavigationBar />
    </div>
  )
}