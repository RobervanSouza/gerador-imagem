"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";


interface Props {}

const Cards = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed flex border-2 border-blue-500 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:translate-y-1 flex-row p-4  ">
          <Plus className="w-6 h-6 text-green-500" strokeWidth={3} />
          <h2 className="font-semibold text-red-500 sm:mt-2">Nova imagem</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
           <DialogTitle>
             Quer criar uma nova imagem?
           </DialogTitle>
           <DialogDescription>
            Clicar no botão abaixo!!!
           </DialogDescription>
        </DialogHeader>
        <form>
          <Input placeholder="Digite o nome da imagem..." />
            <div className="h-4" ></div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Cards;
