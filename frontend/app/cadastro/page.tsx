"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {ClipboardList} from "lucide-react"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter(); 
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: '', 
        email: '' 
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.password2) {
            setError("As senhas são diferentes.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    password2: formData.password2,
                    email: formData.email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso! Faça login.');
                router.push('/login'); 
            } else {
                const errorKeys = Object.keys(data);
                const firstError = data[errorKeys[0]][0];
                setError(firstError); 
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor. Tente novamente.');
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
                            className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-600 rounded-xl" 
                        />
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Email</Label>
                        <Input 
                            id="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange}
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
                            className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-600 rounded-xl" 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password2" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Confirmar Senha</Label>
                        <Input 
                            id="password2" 
                            required 
                            type="password" 
                            value={formData.password2} 
                            onChange={handleChange}
                            className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-600 rounded-xl" 
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Link href="/login" className="w-1/2">
                            <Button type="button" variant="outline" className="w-full border-gray-700 bg-zinc-900 text-gray-300 hover:bg-zinc-600 hover:text-white py-6 rounded-xl uppercase">
                                Voltar
                            </Button>
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-6 rounded-xl uppercase"
                        >
                            {isLoading ? 'Cadastrando...' : 'Salvar'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

