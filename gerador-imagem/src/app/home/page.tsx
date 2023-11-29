import Cards from '@/components/cards/cad'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserButton } from '@clerk/nextjs'

import { ArrowLeft } from 'lucide-react'

import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="grainy min-h-screen">
      <div className="max-w-7x1 mx-auto p-10">
        <div className="h-14"></div>
        <div className="flex justify-center items-center md:flex-row flex-col ">
          <div className="flex items-center">
            <Link href="/">
              <Button className="bg-green-600" size="sm">
                <ArrowLeft className="mr-1 w-4 h-4 " />
                Voltar
              </Button>
            </Link>
            <div className="w-4"></div>
            <h1 className="text-3x1 font-bold text-blue-600">Minhas imagens</h1>
            <div className="w-4"></div>
            <UserButton/>
          </div>
        </div>
        <div className="h-8" ></div>
        <Separator/>
        <div className="h-8" ></div>
        <div className='text-center'>
           <h2 className='text-xl text-red-600' >
            Gerar uma nova imagem
           </h2>
        </div>
        <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3 ">
        <Cards/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
