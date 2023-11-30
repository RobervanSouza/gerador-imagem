
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { gerarImagem, gerarPrompt } from "../../../service/api/apiOpenai";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";

export async function POST(req: Request) {
  
  try {
    const { userId } = auth();

    if (userId == null) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;
    const imagem = await gerarPrompt(name);

    if (!imagem) {
      return new NextResponse("erro na descrição da imagem", { status: 500 });
    }

    const imageUrl = await gerarImagem(imagem);
    if (!imageUrl) {
      return new NextResponse("erro na imagem", { status: 500 });
    }

    const note = await db
      .insert($notes)
      .values({
        name,
        userId,
        imageUrl: imageUrl,
      })
      .returning({
        insertedId: $notes.id,
      });

    return NextResponse.json({
      note_id: note[0].insertedId,
    });
  } catch (error) {
    console.error("Erro na rota:", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
 
}
