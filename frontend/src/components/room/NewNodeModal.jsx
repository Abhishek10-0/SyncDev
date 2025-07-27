// codesync-frontend/src/components/room/NewNodeModal.jsx

import React from 'react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

const NewNodeModal = ({
  newNodeName,
  setNewNodeName,
  newNodeIsFolder,
  setNewNodeIsFolder,
  newNodeError,
  onClose,
  onCreateNode,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary-dark p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New {newNodeIsFolder ? 'Folder' : 'File'}</h2>
        <form onSubmit={onCreateNode} className="space-y-4">
          <Input
            label="Name"
            id="newNodeName"
            type="text"
            placeholder={newNodeIsFolder ? 'my-new-folder' : 'my-new-file.js'}
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="newNodeIsFolder"
              checked={newNodeIsFolder}
              onChange={(e) => setNewNodeIsFolder(e.target.checked)}
              className="form-checkbox h-5 w-5 text-accent-blue rounded border-gray-600 bg-gray-700 focus:ring-accent-blue"
            />
            <label htmlFor="newNodeIsFolder" className="text-gray-300">Is a Folder</label>
          </div>

          {newNodeError && <p className="text-red-500 text-sm text-center">{newNodeError}</p>}

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNodeModal;