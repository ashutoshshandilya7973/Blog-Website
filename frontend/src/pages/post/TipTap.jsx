import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'

import ListItem from '@tiptap/extension-list-item'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from '@/components/Tiptap/MenuBar.jsx'
import BubbleMenuComponent from '@/components/Tiptap/BubbleMenu.jsx'
import '../../app.css'

const extensions = [StarterKit.configure({
  bulletList: true,  // Ensures bullet list is enabled
  orderedList: true, // Ensures ordered list is enabled
}),
  Placeholder.configure({
    placeholder: 'type/browse to change the style'
  }),
  CodeBlock,Blockquote,ListItem
]
const content = ``
const TipTap = () => {

  const editor = useEditor({
    extensions,
    content,
   

  })
  

  return (
   <div>
      {/* <MenuBar editor={editor} /> */}
      <BubbleMenuComponent editor={editor}/>
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap
