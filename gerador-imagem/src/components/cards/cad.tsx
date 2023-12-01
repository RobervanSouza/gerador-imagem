"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { useRouter } from "next/navigation";


interface Props {}

const Cards = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = useState('');

const editarFirebase = useMutation({
  mutationFn: async(noteId: string) => {
    const response = await axios.post('/api/editarFirebase',{
 noteId
    })
    return response.data
  }
})







const criaImagem = useMutation({
  mutationFn: async () => {
    try {
      console.log("Enviando requisição POST para /api/createNotbook");
      const response = await axios.post("/api/criarImagem", {
        name: input,
      });

      return response.data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  },
});

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (input === "") {
    window.alert("Digite algo!!!");
    return;
  }
  criaImagem.mutate(undefined, {
    onSuccess: ({note_id}) => {
      console.log("Imagem Criada com sucesso", {note_id});
      editarFirebase.mutate(note_id)
      router.push(`/criarImagem/${note_id}`)
    },
    onError: (erro) => {
      console.error("Erro ao criar a imagem:", erro);
      window.alert("Erro ao criar")
    },
  });
};

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
          <DialogTitle>Quer criar uma nova imagem?</DialogTitle>
          <DialogDescription>Clicar no botão abaixo!!!</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} >
          <Input 
          value={input}
          onChange={(event) => setInput(event.target.value) }
          placeholder="Digite o nome da imagem..." />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button
              type="reset"
              variant={"secondary"}
              className="bg-red-600 text-white">
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600" disabled={criaImagem.isPending} >
              
                  {criaImagem.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              
              Criar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Cards;
