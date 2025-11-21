import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {ClipboardList} from "lucide-react"

export default function LoginPage() {
  return(
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-sm space-y-8 flex flex-col items-center">
        <div className="text-rose-700">
          <ClipboardList size={64} strokewidth={1.5}/>
        </div>
        
       <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Nome</Label>
            <Input 
              id="username" 
              placeholder="Digite seu usuário" 
              className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-700 rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Senha</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-700 rounded-xl"
            />
          </div>

          <Link href="/dashboard">
            <Button className="w-full bg-rose-700 hover:bg-rose-600 text-white font-bold py-6 rounded-xl mt-6 uppercase tracking-widest">
              Entrar
            </Button>
          </Link>

          <Link href="/cadastro" className="text-sm text-gray-500 hover:text-rose-700 transition-colors">
          Faça seu cadastro.
          </Link>
        </div>
      </div>
    </div>
  )
}