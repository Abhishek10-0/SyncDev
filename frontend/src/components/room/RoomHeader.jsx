// codesync-frontend/src/components/room/Header.jsx

import React from 'react';

const RoomHeader = ({ roomId, isConnected }) => {
  return (
    <div className="p-4 bg-secondary-dark shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Coding Room: {roomId}</h1>
      <div className="flex space-x-4">
        <span className="text-gray-400">
          {isConnected ? 'Socket Connected' : 'Socket Disconnected'}
        </span>
        <button className="px-4 py-2 bg-accent-blue hover:bg-accent-purple rounded-md transition-colors">
          Join Voice Chat
        </button>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default RoomHeader;