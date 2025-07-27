// codesync-frontend/src/components/room/FileExplorer.jsx

import React from 'react';
import Button from '../ui/Button.jsx';

const FileExplorer = ({
  loadingFiles,
  fileError,
  fileTree,
  roomUsers,
  onFileSelect,
  onDeleteNode,
  setShowNewNodeModal,
  onFileUpload,
  uploadingFile,
  fileInputRef,
}) => {
  return (
    <div className="w-1/4 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">File Explorer</h2>
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => setShowNewNodeModal(true)} variant="primary" className="text-sm">
          New File/Folder
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          className="hidden"
          id="file-upload-input"
        />
        <Button onClick={() => fileInputRef.current.click()} variant="secondary" className="text-sm" disabled={uploadingFile}>
          {uploadingFile ? 'Uploading...' : 'Upload File'}
        </Button>
      </div>

      {loadingFiles ? (
        <p className="text-gray-400">Loading files...</p>
      ) : fileError ? (
        <p className="text-red-500">{fileError}</p>
      ) : fileTree.length === 0 ? (
        <p className="text-gray-400 text-sm">No files or folders. Create one!</p>
      ) : (
        <ul className="space-y-2 text-gray-300 overflow-y-auto flex-grow custom-scrollbar">
          {fileTree.map(node => (
            <li key={node.path} className="flex items-center justify-between group">
              <span
                className={`cursor-pointer hover:text-accent-blue transition-colors flex items-center ${node.isFolder ? 'font-semibold' : ''}`}
                onClick={() => !node.isFolder && onFileSelect(node.path)}
              >
                {node.isFolder ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0117 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm4.5 1.5a1.5 1.5 0 00-3 0V12a.5.5 0 01-1 0V5.5a2.5 2.5 0 015 0V12a.5.5 0 01-1 0V5.5z" clipRule="evenodd" />
                  </svg>
                )}
                {node.name}
              </span>
              <Button
                onClick={() => onDeleteNode(node.path)}
                variant="danger"
                className="py-1 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-semibold mt-6 mb-2">Active Users:</h3>
      <ul className="list-disc list-inside text-gray-300">
        {roomUsers.length > 0 ? (
          roomUsers.map(u => (
            <li key={u._id}>{u.username || u.fullName}</li>
          ))
        ) : (
          <li>No active users</li>
        )}
      </ul>
    </div>
  );
};

export default FileExplorer;