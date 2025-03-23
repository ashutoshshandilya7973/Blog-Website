import { BubbleMenu } from "@tiptap/react";
import { Bold, Italic, Strikethrough,Underline,Code,SquareDashedBottomCode,Link,Image } from "lucide-react";
import { setLink } from "@/utils/linkExtension";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import addImage from "@/utils/imageExtensionTiptap";
import "../../app.css";
const BubbleMenuComponent = ({ editor }) => {
  if (!editor) return null;

  const handleSetLink=useCallback(()=>{
         setLink(editor)
  },[editor])
  const handleImage=useCallback(()=>{
    addImage(editor)
  },[editor])
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="border tiptap border-gray-700 rounded-2xl">
      <div className="flex shadow-md p-[1px] rounded-lg ">
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "heading1") {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            } else if (value === "heading2") {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            } else if (value === "heading3") {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            } else if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
            } else if (value === "bulletlist") {
              editor.chain().focus().toggleBulletList().run();
            } else if (value === "numberedlist") {
              editor.chain().focus().toggleOrderedList().run();
            } else if (value === "todolist") {
              editor.chain().focus().splitListItem('listItem').run();
            }
          }}
          className="border border-gray-500 rounded-lg px-2 py-1 bubble-list1"
        >
          <option value="" className="text-[12px]">HIERARCHY:-- </option>
          <option value="heading1">Heading 1</option>
          <option value="heading2">Heading 2</option>
          <option value="heading3">Heading 3</option>
          <option value="paragraph">Paragraph</option>
          <option value="" className="text-[15px]">Lists:-- </option>
          <option value="bulletlist" className="">Bullet List</option>
          <option value="numberedlist" className="">Numbered List</option>
          <option value="todolist" className="">Todo List</option>

        </select>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-200" : ""}
        >
          <Bold size={22} />
        </Button>

        <Button
         type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-200" : ""}
        >
          <Italic size={22} />
        </Button>

        <Button
         type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-gray-200" : ""}
        >
          <Strikethrough size={22} />
        </Button>
        <Button
         type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <Underline size={22} />
          </Button>
          <Button
           type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            <Code size={22} />
          </Button>
          <Button
           type="button"
            variant="ghost"
            size="icon"
            onClick={handleSetLink} className={editor.isActive('link') ? 'is-active' : ''}
          >
            <Link size={22} />
          </Button>
          <Button
           type="button"
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            <SquareDashedBottomCode />
          </Button>
          <Button
           type="button"
            variant="ghost"
            size="icon"
            onClick={handleImage}
            
          >
            <Image  size={22}/>
          </Button>
      </div>
    </BubbleMenu>
  );
};

export default BubbleMenuComponent;
