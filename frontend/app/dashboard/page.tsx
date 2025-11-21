"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClipboardList, LogOut, Trash2, User, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState({ name: "teste", token: "asfasfkasjhfalkjfhasjkfh" })
  const [tasks, setTasks] = useState([
    { id: 1, title: "01 - LISTA" },
    { id: 2, title: "02 - TESTE" },
  ])
  const [newTask, setNewTask] = useState("")

  const handleAddTask = () => {
    if (!newTask) return
    setTasks([...tasks, { id: Date.now(), title: newTask.toUpperCase() }])
    setNewTask("")
  }

  const handleDelete = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-xl">
           <span>Pink</span><span className="text-white">List</span>
        </div>
        <Link href="/login">
            <Button size="icon" variant="ghost" className="text-rose-600 hover:text-rose-500 hover:bg-transparent">
            <LogOut />
            </Button>
        </Link>
      </div>

      <div className="mb-8 text-rose-600">
         <ClipboardList size={80} strokeWidth={1} />
      </div>

      <div className="w-full max-w-md flex gap-2 mb-8">
        <Input 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Tarefa..." 
            className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-600 rounded-xl h-12"
        />
        <Button onClick={handleAddTask} className="bg-rose-600 hover:bg-rose-700 h-12 px-8 rounded-xl font-bold">
            +
        </Button>
      </div>

      <div className="w-full max-w-md space-y-3 mb-12">
        {tasks.map((task) => (
          <div key={task.id} className="group flex items-center justify-between bg-rose-600/90 rounded-xl p-4 transition-all hover:bg-rose-600">
            <span className="font-bold tracking-wider text-black">{task.title}</span>
            <button onClick={() => handleDelete(task.id)} className="text-black opacity-50 hover:opacity-100 transition-opacity">
                <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mt-auto pt-8 border-t border-gray-900">
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-rose-600 mb-2">
                <User size={14} />
                <span className="font-bold uppercase">User:</span>
                <span className="text-rose-400">{user.name}</span>
            </div>
            <div className="flex items-center gap-2 text-rose-600 mb-2">
                <ShieldCheck size={14} />
                <span className="font-bold uppercase text-rose-600 block mb-1">Token:</span>
                <span className="break-all text-gray-400">{user.token}</span>
            </div>
        </div>
      </div>
    </div>
  )
}