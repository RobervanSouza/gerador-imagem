import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { editarImagem } from "@/lib/firebase/firebase";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST( req: Request){
    try {
        const {noteId} = await req.json();
        const notes = await db.select().from($notes).where(eq($notes.id, parseInt(noteId)))

        if(!notes[0].imageUrl){
            return new NextResponse("não tem imagem", {status: 400})
        }

        const firebaseUrl = await editarImagem(notes[0].imageUrl, notes[0].name)

        await db.update($notes).set({
            imageUrl: firebaseUrl,
        }).where(eq($notes.id, parseInt(noteId)))

        return new NextResponse('ok', {status:200})
    } catch (error) {
        console.error(error)
        return new NextResponse("Erro", { status: 500 });
        
    }
}