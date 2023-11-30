"use client";
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TiptapMenuBar from "./tiptapMenuBar";
import { Button } from "../ui/button";

interface Props {}

const TiptapEditor = (props: Props) => {
  const [tipEditor, setTipEditor] = useState("");
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
    content: tipEditor,
    onUpdate: ({ editor }) => {
      setTipEditor(editor.getHTML());
    },
  });
  return (
    <><div className=" top-3 p-2">

      <div className=" flex p-2 gap-3 ">
        {editor && <TiptapMenuBar editor= {editor} />}
        
        <Button >Salvar</Button>
      </div>
      <div className="prose" >
        <EditorContent editor={editor} />
      </div>
    </div>
    </>
  );
};

export default TiptapEditor;
