'use client'
import { ScanLine, ShieldUser } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigationBar() {
    const pathname = usePathname();

    const styleStandart = 'flex flex-col text-black font-bold items-center justify-center gap-1 py-3 text-xs transition-opacity opacity-60';

    return (
        <nav className="fixed bottom-0 w-screen grid grid-cols-2 bg-primary text-primary-foreground border-t-[0.5px] border-t-slate-300/40 border-primary/40 bg-green-800 ">
            <Link
                className={ pathname === '/' ? `${styleStandart} opacity-100` : `${styleStandart}`}
                href="/">
                <ScanLine className="w-5 h-5" />Scanner</Link>
            <Link className={pathname === '/admin' ? `${styleStandart} opacity-100` : `${styleStandart}`} 
                href="/admin">
                <ShieldUser className="w-5 h-5 text" />Admin</Link>
        </nav>
    );
}