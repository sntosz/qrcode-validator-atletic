'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            router.replace('/login');
        }
    }, [token, router]);

    if (!token) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/resetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Erro ao redefinir a senha.');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2500);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-white px-6 py-3">
            <div className="relative flex w-full max-w-3xl items-center justify-center px-5 py-12">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(45,122,77,0.08)] blur-3xl"
                />

                <div className="w-full max-w-md">
                    <div className="rounded-3xl border border-gray-800/60 bg-[rgba(8,18,12,0.65)] p-8 shadow-2xl shadow-black/40 backdrop-blur-md">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(37,80,51,0.95)] ring-1 ring-white/8">
                            <KeyRound className="h-7 w-7 text-white" aria-hidden="true" />
                        </div>

                        <div className="mt-6 text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                Nova Senha
                            </h1>
                            <p className="mt-2 text-sm leading-relaxed text-gray-300">
                                Digite sua nova senha para atualizar seu acesso ao sistema.
                            </p>
                        </div>

                        {success ? (
                            <div className="mt-7 flex flex-col items-center justify-center gap-3 text-center">
                                <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                                <p className="text-sm font-semibold text-emerald-400">
                                    Senha redefinida com sucesso!
                                </p>
                                <p className="text-xs text-gray-400">
                                    Redirecionando para a tela de login...
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password" className="text-white">
                                        Nova Senha
                                    </Label>
                                    <div className="relative">
                                        <Lock
                                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Digite sua nova senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="h-12 rounded-lg bg-[rgba(255,255,255,0.02)] pl-10 pr-10 text-white placeholder:text-gray-500 border border-transparent focus:border-[rgba(255,255,255,0.06)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:text-white"
                                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" aria-hidden="true" />
                                            ) : (
                                                <Eye className="h-4 w-4" aria-hidden="true" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="confirmPassword" className="text-white">
                                        Confirmar Nova Senha
                                    </Label>
                                    <div className="relative">
                                        <Lock
                                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <Input
                                            id="confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Repita a nova senha"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className="h-12 rounded-lg bg-[rgba(255,255,255,0.02)] pl-10 pr-10 text-white placeholder:text-gray-500 border border-transparent focus:border-[rgba(255,255,255,0.06)]"
                                        />
                                    </div>
                                </div>

                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="mt-1 h-12 w-full gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
                                >
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    {loading ? 'Salvando...' : 'Redefinir Senha'}
                                </Button>

                                <Link href="/login" className="text-sm text-center text-emerald-500 underline">
                                    Voltar para o Login
                                </Link>
                            </form>
                        )}

                        {error ? (
                            <div className="mt-3 text-center text-sm text-red-400">{error}</div>
                        ) : null}
                    </div>

                    <p className="mt-5 text-center text-xs text-gray-300">
                        Associação Atlética Acadêmica de Engenharia de Software
                    </p>
                </div>
            </div>
        </main>
    );
}