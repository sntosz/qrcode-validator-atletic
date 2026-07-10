import logoAaaes from '../public/logoAaaes.png'
import Image from 'next/image'
export default function Header() {
  return (
    <header className="flex items-center justify-start gap-3 px-4 py-3 bg-[rgba(6,20,14,0.4)] border-b-[0.5px] border-b-white/10 backdrop-blur-md">
      <div className="flex items-center gap-2 min-w-0">
        <Image src={logoAaaes} alt="A.A.A.E.S.U.C" className="w-10 h-10 object-contain shrink-0 rounded-full" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider font-semibold truncate text-[#008435]">Associação Atlética Acadêmica</p>
        <p className="text-xs truncate text-[#7b9987]">Engenharia de Software · Unigran Capital</p>
      </div>
    </header>
  );
}