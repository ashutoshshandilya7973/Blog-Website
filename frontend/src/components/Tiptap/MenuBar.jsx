import React, { useState } from 'react'
import { FloatingMenu } from '@tiptap/react'
import '../../app.css'
import { FiPlus } from "react-icons/fi";
import { Heading1, Heading2, Heading3, List, Code,Quote } from 'lucide-react';
const MenuBar = ({ editor }) => {
    const [floatingMenu, setFloatingMenu] = useState(false)
    const handleFloatingMenu = () => {
        setFloatingMenu(!floatingMenu)
    }



    return (

        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} className='relative ' shouldShow={({ editor }) => editor.isFocused}  >
            <div className="">
                {
                    <button
                        className="bg-gray-700"
                        style={{
                            // position: "absolute",
                            // left: -60,
                            // top: 0

                        }}
                        onClick={handleFloatingMenu}

                    >
                        <FiPlus size={20} />
                    </button>
                }
            </div>
            {
                floatingMenu && (
                    <div data-testid="floating-menu" className="floating-menu flex flex-col  text-black  ">
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                        >
                            <div className="floatingMenu-button">
                                <span><Heading1 /></span>
                                <span>Heading 1</span>
                            </div>

                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                        >
                            <div className="floatingMenu-button">
                                <span><Heading2 /></span>
                                <span>Heading 2</span>
                            </div>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                        >
                            <div className="floatingMenu-button">
                                <span><Heading3 /></span>
                                <span>Heading 3</span>
                            </div>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            <div className="floatingMenu-button">
                                <span><List /></span>
                                <span>Bullet List</span>
                            </div>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? 'is-active' : ''}
                        >
                            <div className="floatingMenu-button">
                                <span><Code /></span>
                                <span>Code Block</span>
                            </div>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'is-active' : ''}
                        >
                            <div className="floatingMenu-button">
                                <span><Quote /></span>
                                <span>Blockquote</span>
                            </div>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            Bullet list
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                        >
                            Heading2
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            Bullet list
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            Bullet list
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            Bullet list
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                        >
                            Bullet list
                        </button>
                    </div>

                )
            }
        </FloatingMenu>


    )
}

export default MenuBar
