'use client'
import { ScanLine, ShieldUser } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigationBar() {
    const pathname = usePathname();

    const styleStandart = 'flex flex-col text-white font-semibold items-center justify-center gap-1 py-3 text-xs transition-opacity opacity-70';

    return (
        <nav className="fixed bottom-0 w-screen grid grid-cols-2 bg-[rgba(6,20,14,1)] text-white border-t border-t-white/10">
            <Link
                className={pathname === '/' ? `${styleStandart} opacity-100` : `${styleStandart}`}
                href="/">
                <ScanLine className="w-5 h-5" />
                <span className="mt-0.5">Scanner</span>
            </Link>
            <Link className={pathname === '/login' ? `${styleStandart} opacity-100` : `${styleStandart}`}
                href="/login">
                <ShieldUser className="w-5 h-5" />
                <span className="mt-0.5">Admin</span>
            </Link>
        </nav>
    );
}