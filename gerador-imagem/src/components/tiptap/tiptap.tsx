"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TiptapMenuBar from "./tiptapMenuBar";
import { Button } from "../ui/button";
import { useDebouce } from "@/lib/db/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import Text from "@tiptap/extension-text";
import { useCompletion } from "ai/react";
interface Props {
  note: NoteType;
}
// ... (imports omitidos para brevidade)

const TiptapEditor = ({ note }: Props) => {
  const [editorState, setTipEditor] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );

  const { complete, completion } = useCompletion({
    api: "/api/autoTexto",
  });

  const salvar = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/salvaDescricao", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const autoComplete = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split("").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, autoComplete],
    content: editorState,
    onUpdate: ({ editor }) => {
      setTipEditor(editor.getHTML());
    },
  });

  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debouceEditor = useDebouce(editorState, 500);

  useEffect(() => {
    if (debouceEditor === "") return;
    salvar.mutate(undefined, {
      onSuccess: (data) => {
        console.log("deu update ", data);
      },
      onError: (err) => {
        console.error(err, "erro aqui ");
      },
    });
  }, [debouceEditor]);

  const handleAutoCompleteButtonClick = () => {
    if (editor !== null) {
      const prompt = editor.getHTML().split("").slice(-30).join(" ");
      complete(prompt);
    }
  };


  return (
    <>
      <div className="top-3 p-2">
        <div className="flex p-2 gap-3">
          {editor && <TiptapMenuBar editor={editor} />}

          {/* Adicione o botão aqui */}
          <Button variant="outline" onClick={handleAutoCompleteButtonClick}>
            Completar
          </Button>

          <Button disabled variant={"outline"}>
            {salvar.isPending ? "salvando ..." : "salvar"}
          </Button>
        </div>
        <div className="prose prose-sm w-full mt-4">
          <EditorContent editor={editor} />
        </div>
        <div className="h-4"></div>
        <span className="text-sm">
          Pressione&nbsp;
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            Shift + A
          </kbd>
          &nbsp;ou no botão completar a descrição!!!
        </span>
      </div>
    </>
  );
};

export default TiptapEditor;
