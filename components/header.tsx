'use client'
import logoAaaes from '../public/logoAaaes.png'
import Image from 'next/image'
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { logoutAdmin } from '@/actions/admin'
import { usePathname } from 'next/navigation'
import { useState } from 'react';

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [exit, setExit] = useState(false)
  const shouldShowLogout = pathname !== '/' && pathname !== '/login'

  async function handleLogout() {
    try {
      setExit(true)
      await logoutAdmin()
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Erro ao efetuar logout:', err)
      setExit(false)
    }
  }
  return (
    <header className="flex items-center justify-between gap-3 px-4 py-3 bg-[rgba(6,20,14,0.4)] border-b-[0.5px] border-b-white/10 backdrop-blur-md">
      <div className="flex items-center justify-start gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Image src={logoAaaes} alt="A.A.A.E.S.U.C" className="w-10 h-10 object-contain shrink-0 rounded-full" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider font-semibold truncate text-[#008435]">Associação Atlética Acadêmica</p>
          <p className="text-xs truncate text-[#7b9987]">Engenharia de Software · Unigran Capital</p>
        </div>
      </div>
      <div>
        {shouldShowLogout && (
          <Button className="cursor-pointer" onClick={handleLogout} disabled={exit}>
            <LogOut></LogOut>
            Sair
          </Button>
        )}
      </div>
    </header>
  );
}