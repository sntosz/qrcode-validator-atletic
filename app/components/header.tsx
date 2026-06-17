import logoAaaes from '../../public/logoAaaes.png'
import Image from 'next/image'
export default function Header() {
  return (
    <header className="flex items-center justify-start gap-3 px-4 py-3 border-b-[0.5px] border-b-slate-300/40 border-border bg-card/40">
      <div className="flex items-center gap-2 min-w-0">
        <Image src={logoAaaes} alt="A.A.A.E.S.U.C" className="w-10 h-10 object-contain shrink-0" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider font-semibold truncate text-[var(--text-secondary)]">Associação Atlética Acadêmica</p>
        <p className="text-xs text-muted-foreground truncate text-[var(--text-tertiary)]">Engenharia de Software Unigran Capital</p>
      </div>
    </header>
  );
}