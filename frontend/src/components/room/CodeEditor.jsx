// codesync-frontend/src/components/room/CodeEditor.jsx

import React from 'react';
import Button from '../ui/Button.jsx';

const CodeEditor = ({ editorRef, currentFilePath, onSaveFile }) => {
  return (
    <div className="flex-grow bg-gray-900 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
        <span>Code Editor {currentFilePath && `(${currentFilePath})`}</span>
        {currentFilePath && (
          <Button onClick={onSaveFile} variant="primary" className="text-sm py-1 px-3">
            Save File
          </Button>
        )}
      </h2>
      <div ref={editorRef} className="flex-grow bg-gray-800 rounded-md overflow-hidden">
        {/* Monaco Editor will be rendered inside this div */}
      </div>
    </div>
  );
};

export default CodeEditor;