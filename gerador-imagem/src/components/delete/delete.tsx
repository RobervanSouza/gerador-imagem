'use client'
import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { error } from "console";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
    const router = useRouter()
    const deleteImagem = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/deletarImg', {
                noteId
            })
            return response.data
        }
    })
  return (
    <Button
      variant={"destructive"}
      size="sm"
      disabled={deleteImagem.isPending}
      onClick={() => {
        const confirma = window.confirm(
          "Realmente deseja deletar essa imagem?"
        )
        if(!confirma)return
        deleteImagem.mutate(undefined, {
            onSuccess:() => {
                router.push('/home')
            },
            onError: (error) => {
                console.log(error)
            }
        })
      }}>
      <Trash />
    </Button>
  );
};

export default DeleteButton;
