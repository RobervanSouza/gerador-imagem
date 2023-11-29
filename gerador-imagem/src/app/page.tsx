import Descricao from "@/components/descricao/descricao";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
        <div className="text-center">
          <h1 className="font-semibold text-4xl">
            Criar <span className="text-red-500 font-bold">imagens</span>
            <span className="text-green-500 font-bold"> com IA!!!</span>
          </h1>
          <div className="mt-4"></div>
          <h2 className="font-semibold text-2xl text-blue-500">
            <Descricao/>
          </h2>
          <div className="mt-8"></div>
          <div className="flex justify-center">
            <Link href="/home">
              <Button className="bg-green-600">Entrar              
              <ArrowBigRight className="ml-2 w-5 h-5" strokeWidth={3} />
              </Button>
            </Link>
          
          </div>
        </div>
      </div>
    </>
  );
}
