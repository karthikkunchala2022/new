import React, { useState } from 'react';

/**
 * ChatMessage
 * Props:
 *  - author: string
 *  - timestamp: string
 *  - text: string
 */
function ChatMessage({ author, timestamp, text }) {
  return (
    <div className="mb-4">
      <div className="text-xs text-gray-500 mb-1">
        <span className="font-semibold text-gray-700">{author}</span>
        <span className="ml-2">{timestamp}</span>
      </div>
      <div className="inline-block bg-gray-100 p-3 rounded-xl max-w-full">
        {text}
      </div>
    </div>
  );
}

/**
 * CommentList
 * Props:
 *  - comments: Array<{ id, author, timestamp, text }>
 *  - onAdd: (text: string) => void
 */
export default function CommentList({ comments, onAdd }) {
  const [input, setInput] = useState('');

  const handleKey = e => {
    if (e.key === 'Enter' && input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="mt-6">
      {comments.map(c => (
        <ChatMessage
          key={c.id}
          author={c.author}
          timestamp={c.timestamp}
          text={c.text}
        />
      ))}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add a comment..."
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            onAdd(input.trim());
            setInput('');
          }}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
        >
          Comment
        </button>
      </div>
    </div>
  );
}
