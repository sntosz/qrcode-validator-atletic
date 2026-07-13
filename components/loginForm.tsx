"use client"

import type React from "react"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginAdmin } from "@/actions/admin"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const res = await LoginAdmin(username, password)

    if (!res.sucesso) {
      setError(res.erro || "Erro ao efetuar o Login")
      setLoading(false)
    } else {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-gray-800/60 bg-[rgba(8,18,12,0.65)] p-8 shadow-2xl shadow-black/40 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(37,80,51,0.95)] ring-1 ring-white/8">
          <Lock className="h-7 w-7 text-white" aria-hidden="true" />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Área Administrativa
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-300">
            Entre com suas credenciais para gerenciar as carteirinhas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-white">
              Usuário
            </Label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Digite seu usuário ou e-mail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-lg bg-[rgba(255,255,255,0.02)] pl-10 pr-3 text-white placeholder:text-gray-500 border border-transparent focus:border-[rgba(255,255,255,0.06)]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-white">
              Senha
            </Label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-lg bg-[rgba(255,255,255,0.02)] pl-10 pr-10 text-white placeholder:text-gray-500 border border-transparent focus:border-[rgba(255,255,255,0.06)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-white"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Button disabled={loading} type="submit" className="mt-1 h-12 w-full gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        {error ? (
          <div className="mt-3 text-center text-sm text-red-400">{error}</div>
        ) : null}
      </div>

      <p className="mt-5 text-center text-xs text-gray-300">
        Acesso restrito à diretoria da Atlética.
      </p>
    </div>
  )
}
