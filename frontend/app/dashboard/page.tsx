"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClipboardList, LogOut, Trash2, User } from "lucide-react"
import Link from "next/link"
import { Task, fetchTasks, createTask, deleteTask } from "@/lib/api" 

export default function DashboardPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [userName, setUserName] = useState("Carregando...");
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTasks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (err: any) {
            if (err.message.includes('401') || err.message.includes('Token não encontrado')) {
                handleLogout(false);
            } else {
                setError(err.message || 'Erro ao carregar tarefas.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            router.push('/login');
            return;
        }
      
        try {
            const payload = JSON.parse(atob(access_token.split('.')[1]));
            setUserName(payload.username || 'Usuário');
        } catch (e) {
            setUserName('Usuário');
        }

        setToken(access_token);
        loadTasks();
    }, [loadTasks, router]);


    const handleAddTask = async () => {
        if (!newTask.trim() || !token) return;

        try {
            const addedTask = await createTask(newTask.trim());
            setTasks(prevTasks => [...prevTasks, addedTask]);
            setNewTask("");
        } catch (err: any) {
             setError('Falha ao adicionar tarefa: ' + err.message);
        }
    }

    const handleDeleteTask = async (id: number) => {
        if (!token) return;
        setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
        
        try {
            await deleteTask(id);
        } catch (err: any) {
            setError('Falha ao deletar tarefa: ' + err.message);
            loadTasks(); 
        }
    }
    

    const handleLogout = (shouldAlert: boolean = true) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (shouldAlert) {
            alert('Você foi desconectado.');
        }
        router.push('/login');
    }

    if (!token && !isLoading) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">

            <div className="w-full max-w-md flex justify-between items-center mb-12">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xl">
                    <span>pink</span><span className="text-white">List</span>
                </div>
                <Button onClick={() => handleLogout()} size="icon" variant="ghost" className="text-rose-600 hover:text-rose-500 hover:bg-transparent">
                    <LogOut />
                </Button>
            </div>

            <div className="mb-8 text-rose-600">
                <ClipboardList size={80} strokeWidth={1} />
            </div>

            <div className="w-full max-w-md flex gap-2 mb-8">
                <Input 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                    placeholder="Adicionar nova tarefa..." 
                    className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-600 rounded-xl h-12"
                    disabled={isLoading}
                />
                <Button onClick={handleAddTask} disabled={isLoading} className="bg-rose-600 hover:bg-rose-700 h-12 px-8 rounded-xl font-bold">
                    {isLoading ? '...' : '+++'}
                </Button>
            </div>


            {isLoading && <p className="text-gray-500">Carregando tarefas...</p>}
            {error && <p className="text-red-500 bg-red-900/50 p-2 rounded w-full max-w-md">{error}</p>}

            <div className="w-full max-w-md space-y-3 mb-12">
                {tasks.length === 0 && !isLoading && !error && (
                    <p className="text-center text-gray-700 p-4 border border-gray-900 rounded-lg">Nenhuma tarefa encontrada. Adicione uma acima!</p>
                )}
                {tasks.map((task) => (
                    <div key={task.id} className="group flex items-center justify-between bg-rose-600/90 rounded-xl p-4 transition-all hover:bg-rose-600">
                        <span className="font-bold tracking-wider text-black">{task.title}</span>
                        <button onClick={() => handleDeleteTask(task.id)} className="text-black opacity-50 hover:opacity-100 transition-opacity">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-md mt-auto pt-8 border-t border-gray-900">
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-rose-400 mb-2">
                        <User size={14} />
                        <span className="font-bold uppercase">Usuário Logado:</span>
                        <span className="text-white">{userName}</span>
                    </div>
                    <div>
                        <span className="font-bold uppercase text-rose-400 block mb-1">Access Token (Invisível em produção):</span>
                        <p className="break-all text-gray-500 overflow-hidden text-ellipsis h-6">{token || 'Token não encontrado.'}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}