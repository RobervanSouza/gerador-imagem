import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { noteId, editorState } = body
    if(!editorState || !noteId) {
        return new NextResponse("não tem ID aqui", {status: 400})
    }

    noteId = parseInt(noteId)
    const response = await db.select().from($notes).where(
        eq($notes.id, noteId)
    )

    if(response.length != 1){
        return new NextResponse("erro ao editar", {status: 400})
    }

    const note = response[0]
    if(note.editorState !== editorState){
        await db.update($notes).set({
            editorState
        }).where(
            eq($notes.id, noteId)
        )
    }
    return NextResponse.json({
        success: true,

    }, {status: 200})
  } catch (error) {
    console.error(error)
      return NextResponse.json(
        {
          success: false,
        },
        { status: 500 }
      );
    
  }
}