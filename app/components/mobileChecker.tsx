'use client'

import { useEffect, useState } from 'react'

export default function MobileCheck({ children }: { children: React.ReactNode }) {
  const [isPhone, setIsPhone] = useState<boolean | null>(null)

  useEffect(() => {
    const dispositivo = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    setIsPhone(dispositivo)
  }, [])

  if (isPhone === null) return null

  if (!isPhone) {
    return (
      <div className="bg-zinc-950 text-white flex items-center justify-center min-h-screen font-sans text-center p-6 w-full">
        <div>
          <h1 className="text-2xl font-bold mb-2">Dispositivo não suportado 📱</h1>
          <p className="text-zinc-400">Por favor, abra este link usando o seu celular!</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}