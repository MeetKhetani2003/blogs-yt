"use client";

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Image as ImageIcon, Video as YoutubeIcon, Link as LinkIcon, Undo, Redo, FileImage, Table as TableIcon, Trash, Columns, Rows } from 'lucide-react';
import React, { useCallback } from 'react';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        // We'll upload this via our API
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/media/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            editor.chain().focus().setImage({ src: data.image.url }).run();
        } else {
            alert('Image upload failed');
        }
      }
    };
    input.click();
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = prompt('Enter YouTube URL');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  }, [editor]);

  const toggleLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const btnClass = "p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors";
  const activeClass = "bg-slate-200 text-gold-600";

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 sticky top-0 z-10 rounded-t-xl">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${btnClass} ${editor.isActive('bold') ? activeClass : ''}`} type="button">
        <Bold className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${btnClass} ${editor.isActive('italic') ? activeClass : ''}`} type="button">
        <Italic className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`${btnClass} ${editor.isActive('strike') ? activeClass : ''}`} type="button">
        <Strikethrough className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleCode().run()} className={`${btnClass} ${editor.isActive('code') ? activeClass : ''}`} type="button">
        <Code className="w-4 h-4" />
      </button>
      
      <div className="w-px h-5 bg-slate-300 mx-1"></div>
      
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${btnClass} ${editor.isActive('heading', { level: 1 }) ? activeClass : ''}`} type="button">
        <Heading1 className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${btnClass} ${editor.isActive('heading', { level: 2 }) ? activeClass : ''}`} type="button">
        <Heading2 className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${btnClass} ${editor.isActive('heading', { level: 3 }) ? activeClass : ''}`} type="button">
        <Heading3 className="w-4 h-4" />
      </button>
      
      <div className="w-px h-5 bg-slate-300 mx-1"></div>
      
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${btnClass} ${editor.isActive('bulletList') ? activeClass : ''}`} type="button">
        <List className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${btnClass} ${editor.isActive('orderedList') ? activeClass : ''}`} type="button">
        <ListOrdered className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${btnClass} ${editor.isActive('blockquote') ? activeClass : ''}`} type="button">
        <Quote className="w-4 h-4" />
      </button>
      
      <div className="w-px h-5 bg-slate-300 mx-1"></div>
      
      <button onClick={addImage} className={btnClass} type="button" title="Upload Image">
        <FileImage className="w-4 h-4" />
      </button>
      <button onClick={addYoutube} className={btnClass} type="button" title="Embed YouTube Video">
        <YoutubeIcon className="w-4 h-4" />
      </button>
      <button onClick={toggleLink} className={`${btnClass} ${editor.isActive('link') ? activeClass : ''}`} type="button" title="Add Link">
        <LinkIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-300 mx-1"></div>

      {/* Table Controls */}
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={btnClass} type="button" title="Insert Table">
        <TableIcon className="w-4 h-4" />
      </button>
      {editor.isActive('table') && (
          <>
             <button onClick={() => editor.chain().focus().deleteTable().run()} className={`${btnClass} text-red-500 hover:bg-red-50`} type="button" title="Delete Table">
               <Trash className="w-4 h-4" />
             </button>
             <button onClick={() => editor.chain().focus().addColumnAfter().run()} className={btnClass} type="button" title="Add Column After">
               <Columns className="w-4 h-4" />
             </button>
             <button onClick={() => editor.chain().focus().addRowAfter().run()} className={btnClass} type="button" title="Add Row After">
               <Rows className="w-4 h-4" />
             </button>
          </>
      )}

      <div className="w-px h-5 bg-slate-300 mx-1"></div>
      
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btnClass} type="button">
        <Undo className="w-4 h-4 opacity-50" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btnClass} type="button">
        <Redo className="w-4 h-4 opacity-50" />
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Youtube.configure({
        controls: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-6 text-textPrimary',
        },
    },
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
