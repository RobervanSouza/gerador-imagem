import TiptapEditor from "@/components/tiptap/tiptap";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { server } from "@/lib/db/server";
import { auth } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    noteId: string;
  };
};

const Imagem = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/home");
  }

  const user = await server.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (notes.length != 1) {
    return redirect("/home");
  }
  const note = notes[0];
  // return <pre> {JSON.stringify(note, null, 2)} </pre> // ver o json do imagem

  return (
    <div className="min-h-screen grainy p-8">
      <div className=" max-w-4x1 mx-auto">
        <div className=" border shadow-xl border-stone-200 rounded-lg p4 flex items-center">
          <Link href="/home">
            <Button className="bg-green-500" size="sm">
              Voltar
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className=" font-semibold" >
            {user.firstName} {user.lastName}
          </span>
          <span className=" inline-block mx-1" >/</span>
          <span className=" text-stone-500 font-bold" > {note.name} </span>
          <div className="ml-auto"> Deletar </div>
        </div>
        <div className="h-4"></div>
        <div className=" border-red-100 shadow-xl border rounded-lg px-16 w-full" >
        {/* editar */}

        <TiptapEditor/>

        </div>

      </div>
    </div>
  );
};

export default Imagem;
