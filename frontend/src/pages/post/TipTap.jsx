import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import Underline from '@tiptap/extension-underline'
import Code from '@tiptap/extension-code'
import { linkExtension } from '@/utils/linkExtension'
import Image from '@tiptap/extension-image'

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
  CodeBlock,Blockquote,ListItem,Underline,Code,linkExtension,Image

]
const content = ``
const TipTap = ({setValue}) => {

  const editor = useEditor({
    extensions,
    content,
    onUpdate:({editor})=>{
         setValue("content",editor.getHTML())
    }
   

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
