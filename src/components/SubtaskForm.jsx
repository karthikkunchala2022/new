import React, { useState, useRef } from 'react';
import { FiPaperclip, FiSend } from 'react-icons/fi';

/**
 * SubtaskForm
 * Props:
 *  - onAdd: ({ text: string, files: File[] }) => void
 */
export default function SubtaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleAdd = () => {
    if (!text.trim() && files.length === 0) return;
    onAdd({ text: text.trim(), files });
    setText('');
    setFiles([]);
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter new subtask"
        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        title="Attach files"
      >
        <FiPaperclip size={20} />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={e => setFiles(Array.from(e.target.files))}
      />
      <button
        type="button"
        onClick={handleAdd}
        className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
      >
        <FiSend size={20} />
      </button>
    </div>
  );
}
