"use client";
import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TiptapMenuBar from "./tiptapMenuBar";
import { Button } from "../ui/button";
import { useDebouce } from "@/lib/db/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import Text from "@tiptap/extension-text";
interface Props {
    note: NoteType
}

const TiptapEditor = ({note}: Props) => {
  const [editorState, setTipEditor] = useState(note.editorState || `<h1>${note.name}</h1>`);
  
  const salvar = useMutation({
    mutationFn: async () => {
        console.log("Enviando dados:", { noteId: note.id, editorState });
        const response = await axios.post("/api/salvaDescricao", {
          noteId: note.id,
          editorState,
        });
        return response.data;
    }
  })

  const autoComplete = Text.extend({
    addKeyboardShortcuts() {
        return {
            'Shift-a': () => {
                console.log("autoComplete")
                return true;
            },
        }
    },
  })
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, autoComplete],
    content: editorState,
    onUpdate: ({ editor }) => {
      setTipEditor(editor.getHTML());
    },
  });
  const debouceEditor = useDebouce(editorState, 500);

  useEffect(() => {
    if(debouceEditor === '') return;
    salvar.mutate(undefined, {
        onSuccess: data => {
            console.log("deu update ", data)
        }, onError: err =>{
            console.error(err, "erro aqui " )
        }
    })
  
    
  }, [debouceEditor]);
  return (
    <><div className=" top-3 p-2">

      <div className=" flex p-2 gap-3 ">
        {editor && <TiptapMenuBar editor= {editor} />}
        
        <Button disabled variant={"outline"} >
            {salvar.isPending ? "salvando ..." : "salvar"}
        </Button>
      </div>
      <div className="prose" >
        <EditorContent editor={editor} />
      </div>
    </div>
    </>
  );
};

export default TiptapEditor;
