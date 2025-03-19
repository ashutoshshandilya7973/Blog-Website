import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'

import { useState } from 'react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from '@/components/Tiptap/MenuBar.jsx'
import BubbleMenuComponent from '@/components/Tiptap/BubbleMenu.jsx'
import '../../app.css'
import FloatingMenu from '@tiptap/extension-floating-menu';

const extensions = [StarterKit,
  Placeholder.configure({
    placeholder: 'type/browse to change the style'
  }),
  CodeBlock,Blockquote,BulletList
]
const content = ``
const TipTap = () => {

  const editor = useEditor({
    extensions,
    content,
   

  })
  

  return (
   <div>
      <MenuBar editor={editor} />
      <BubbleMenuComponent editor={editor}/>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap
