import { BubbleMenu } from "@tiptap/react";
import { Bold, Italic, Strikethrough } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // Example UI button component

const BubbleMenuComponent = ({ editor }) => {
  if (!editor) return null; // Ensure editor instance exists

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="flex gap-2 bg-white shadow-md p-2 rounded-lg border border-gray-300">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-200" : ""}
        >
          <Bold size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-200" : ""}
        >
          <Italic size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-gray-200" : ""}
        >
          <Strikethrough size={18} />
        </Button>
      </div>
    </BubbleMenu>
  );
};

export default BubbleMenuComponent;
