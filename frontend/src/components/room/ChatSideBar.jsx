// codesync-frontend/src/components/room/Chat.jsx

import React from 'react';

const Chat = ({ chatMessages, user, newChatMessage, setNewChatMessage, onSendChatMessage }) => {
  return (
    <div className="w-1/4 bg-gray-800 p-4 border-l border-gray-700 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="flex-grow bg-gray-700 rounded-md p-2 overflow-y-auto mb-4 custom-scrollbar">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.senderId === user._id ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.senderId === user._id ? 'bg-accent-blue text-white' : 'bg-gray-600 text-gray-100'}`}>
              <strong className="block text-sm">{msg.senderId === user._id ? 'You' : msg.senderName}</strong>
              {msg.text}
              <span className="block text-xs text-gray-300 opacity-75 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={onSendChatMessage} className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={newChatMessage}
          onChange={(e) => setNewChatMessage(e.target.value)}
          className="flex-grow p-2 rounded-l-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-blue"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-accent-blue hover:bg-accent-purple rounded-r-md transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;