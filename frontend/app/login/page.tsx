"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ClipboardList } from "lucide-react"

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                
                alert('Login realizado com sucesso!');
                router.push('/dashboard');
            } else {
                setError(data.detail || 'Usuário ou senha incorretos.');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
            <div className="w-full max-w-sm space-y-8 flex flex-col items-center">
                <div className="text-rose-600">
                    <ClipboardList size={64} strokeWidth={1.5} />
                </div>
                
                {error && (
                    <p className="text-red-500 bg-red-900/50 p-2 rounded text-center w-full">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Usuário</Label>
                        <Input 
                            id="username" 
                            required 
                            value={formData.username} 
                            onChange={handleChange}
                            placeholder="Digite seu usuário" 
                            className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-600 rounded-xl"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Senha</Label>
                        <Input 
                            id="password" 
                            required 
                            type="password" 
                            value={formData.password} 
                            onChange={handleChange}
                            placeholder="********" 
                            className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-600 rounded-xl"
                        />
                    </div>

                    <Button disabled={isLoading} type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-6 rounded-xl mt-6 uppercase tracking-widest">
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>

                <div className="text-center">
                    <Link href="/cadastro" className="text-sm text-gray-500 hover:text-rose-500 transition-colors">
                        Faça seu cadastro.
                    </Link>
                </div>
            </div>
        </div>
    )
}