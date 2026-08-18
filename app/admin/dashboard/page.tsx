'use client'
import BottomNavigationBar from '@/components/BottomNavigationBar'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { UsersRound } from 'lucide-react'
import Link from 'next/link'
import { CarteirinhaCard, type CarteirinhaData } from '@/components/CarteirinhaCard'
import { useEffect, useMemo, useState } from 'react'

const ItemsPerPage = 6

export default function Dashboard() {
  const [data, setData] = useState<CarteirinhaData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/carteirinhas')
        if (!res.ok) throw new Error('Erro ao buscar carteirinhas')
        const json = await res.json()
        setData(json.data ?? [])
      } catch (err: any) {
        setError(err?.message ?? 'Erro ao buscar dados')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return data

    return data.filter((item) => {
      return item.name.toLowerCase().includes(term) || item.rgm.toLowerCase().includes(term)
    })
  }, [data, searchTerm])

  const pageCount = Math.max(1, Math.ceil(filteredData.length / ItemsPerPage))
  const pageData = useMemo(() => {
    const start = (page - 1) * ItemsPerPage
    return filteredData.slice(start, start + ItemsPerPage)
  }, [filteredData, page])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setPage(1)
  }

  const handlePreviousPage = () => setPage((current) => Math.max(1, current - 1))
  const handleNextPage = () => setPage((current) => Math.min(pageCount, current + 1))

  return (
    <>
      <Header />

      <main className="flex min-h-[calc(100vh-5rem)] flex-1 flex-col items-center justify-between px-6 py-6 pb-32 md:px-10">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-300">
                <UsersRound className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Cadastros</h1>
                <p className="text-sm text-gray-400">
                  {loading ? 'Carregando...' : `${filteredData.length} de ${data.length} sócio(s) encontrados`}
                </p>
              </div>
            </div>
            <Link href="/admin/register" className="w-full md:w-auto">
              <Button className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg shadow-green-500/20 md:mt-0 md:w-auto">
                Adicionar Sócio
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.7)] backdrop-blur-sm md:grid-cols-[1fr_auto] md:items-end">
            <label className="flex flex-col gap-2 text-sm text-gray-300">
              Buscar por nome ou RGM
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Ex: Matheus Campos ou 062962"
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-green-400/80 focus:ring-2 focus:ring-green-400/20"
              />
            </label>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-gray-300">
              <p>{filteredData.length} resultado(s)</p>
            </div>
          </div>

          {error ? (
            <div className="mt-8 rounded-3xl border border-red-500/30 bg-red-900/20 px-6 py-8 text-center text-red-200">
              {error}
            </div>
          ) : loading ? (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center text-gray-300">
              Carregando carteirinhas...
            </div>
          ) : filteredData.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-green-500/50 bg-white/5 px-6 py-10 text-center">
              <p className="text-sm text-gray-300">Nenhuma carteirinha encontrada com esse filtro.</p>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6">
                {pageData.map((item) => (
                  <CarteirinhaCard key={`${item.rgm}`} data={item} />
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.7)] md:flex-row md:items-center md:justify-between">
                <p>
                  Mostrando {pageData.length} de {filteredData.length} resultado(s)
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-white transition hover:border-green-400/70 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Anterior
                  </button>
                  <span className="px-3 text-white">{page}</span>
                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={page === pageCount}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-white transition hover:border-green-400/70 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Próxima
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <BottomNavigationBar />
    </>
  )
}
