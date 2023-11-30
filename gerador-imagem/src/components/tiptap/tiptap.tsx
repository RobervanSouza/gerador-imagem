'use client'
import React, { useState } from 'react'
import {EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

interface Props {
    
}

const TiptapEditor = (props: Props) => {
    const [tipEditor, setTipEditor] = useState('');
    const editor = useEditor({
        autofocus: true,
        extensions: [ StarterKit],
        content : tipEditor,
        onUpdate: ({ editor }) => {
            setTipEditor(editor.getHTML())
        }
    })
    return (
        <div>
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TiptapEditor
