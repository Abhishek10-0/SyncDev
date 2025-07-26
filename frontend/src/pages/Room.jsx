// codesync-frontend/src/pages/Room.jsx
// Placeholder for the collaborative coding room page.

import React from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams(); // Get roomId from URL parameters

  return (
    <div className="min-h-screen bg-primary-dark text-white flex flex-col">
      <div className="p-4 bg-secondary-dark shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coding Room: {roomId}</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-accent-blue hover:bg-accent-purple rounded-md transition-colors">
            Join Voice Chat
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
            Leave Room
          </button>
        </div>
      </div>

      <div className="flex flex-grow">
        {/* Left Sidebar: File Explorer */}
        <div className="w-1/4 bg-gray-800 p-4 border-r border-gray-700">
          <h2 className="text-xl font-semibold mb-4">File Explorer</h2>
          <p className="text-gray-400">File tree and GitHub clone option will go here.</p>
        </div>

        {/* Main Content: Code Editor & Whiteboard */}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow bg-gray-900 p-4">
            <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
            <div className="bg-gray-800 h-64 rounded-md flex items-center justify-center text-gray-500">
              Monaco Editor / CodeMirror will be integrated here.
            </div>
          </div>
          <div className="bg-gray-900 p-4 border-t border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Whiteboard</h2>
            <div className="bg-gray-800 h-48 rounded-md flex items-center justify-center text-gray-500">
              Whiteboard canvas will go here.
            </div>
          </div>
        </div>

        {/* Right Sidebar: Chat */}
        <div className="w-1/4 bg-gray-800 p-4 border-l border-gray-700 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Chat</h2>
          <div className="flex-grow bg-gray-700 rounded-md p-2 overflow-y-auto mb-4">
            <p className="text-gray-400">Chat messages will appear here.</p>
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-blue"
          />
        </div>
      </div>
    </div>
  );
};

export default Room; // Crucial default export
