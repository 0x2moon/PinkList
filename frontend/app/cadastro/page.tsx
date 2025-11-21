import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {ClipboardList} from "lucide-react"

export default function RegisterPage() {
 return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-sm space-y-8 flex flex-col items-center">
        <div className="text-rose-700">
          <ClipboardList size={64} strokeWidth={1.5} />
        </div>
        
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Nome</Label>
            <Input id="username" className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-700 rounded-xl" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300 uppercase text-xs font-bold tracking-widest">Senha</Label>
            <Input id="password" type="password" className="bg-transparent border-gray-700 text-white focus-visible:ring-rose-700 rounded-xl" />
          </div>

          <div className="flex gap-4 pt-4">
             <Link href="/login" className="w-1/2">
                <Button variant="outline" className="w-full border-gray-900 bg-zinc-900 text-gray-300 hover:bg-zinc-600 hover:text-white py-6 rounded-xl uppercase">
                  Voltar
                </Button>
            </Link>
            <Button className="w-1/2 bg-rose-700 hover:bg-rose-600 text-white font-bold py-6 rounded-xl uppercase">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

