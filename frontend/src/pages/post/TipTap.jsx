import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'

import StarterKit from '@tiptap/starter-kit'
import MenuBar from '@/components/Tiptap/MenuBar.jsx'
import BubbleMenuComponent from '@/components/Tiptap/BubbleMenu.jsx'

const extensions = [StarterKit,
  Placeholder.configure({
    placeholder: 'type/browse to change the style'
  })
]
const content = ``
const TipTap = () => {

  const editor = useEditor({
    extensions,
    content,

  })
  console.log("rerender")
  return (

    <div>
      <MenuBar editor={editor} />
      <BubbleMenuComponent editor={editor}/>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap
