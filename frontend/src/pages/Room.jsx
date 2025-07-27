import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as monaco from 'monaco-editor';
import { useSocket } from '../context/SocketContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { listRoomContents, getFileContent, updateFileContent, createNode, deleteNode, uploadFile } from '../api/fileApi.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

// Import the new components
import Header from '../components/room/RoomHeader.jsx';
import FileExplorer from '../components/room/FileExplorer.jsx';
import CodeEditor from '../components/room/CodeEditor.jsx';
import Chat from '../components/room/ChatSideBar.jsx';
import NewNodeModal from '../components/room/NewNodeModal.jsx';

const Room = () => {
  const { roomId } = useParams();
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  const editorRef = useRef(null);
  const monacoInstanceRef = useRef(null);
  const [editorContent, setEditorContent] = useState('// Select a file to start coding!');
  const [currentFilePath, setCurrentFilePath] = useState('');
  const [roomUsers, setRoomUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [fileTree, setFileTree] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [fileError, setFileError] = useState('');
  const [showNewNodeModal, setShowNewNodeModal] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeIsFolder, setNewNodeIsFolder] = useState(false);
  const [newNodeError, setNewNodeError] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef(null);

  // UseRefs to hold the latest state/props values for stable callbacks
  const socketRef = useRef(socket);
  const roomIdRef = useRef(roomId);
  const userRef = useRef(user);
  const currentFilePathRef = useRef(currentFilePath);
  const editorContentRef = useRef(editorContent); // Ref for editor content state

  // Update refs whenever their corresponding state/prop changes
  useEffect(() => { socketRef.current = socket; }, [socket]);
  useEffect(() => { roomIdRef.current = roomId; }, [roomId]);
  useEffect(() => { userRef.current = user; }, [user]);
  useEffect(() => { currentFilePathRef.current = currentFilePath; }, [currentFilePath]);
  useEffect(() => { editorContentRef.current = editorContent; }, [editorContent]);


  // Function to fetch file tree
  const fetchFileTree = useCallback(async () => {
    setLoadingFiles(true);
    setFileError('');
    try {
      const contents = await listRoomContents(roomIdRef.current); // Use ref
      setFileTree(contents);
    } catch (error) {
      setFileError('Failed to load file tree.');
      console.error('Error fetching file tree:', error);
    } finally {
      setLoadingFiles(false);
    }
  }, [roomId]);

  // Function to load file content into editor
  const loadFileIntoEditor = useCallback(async (filePath) => {
    setEditorContent('Loading file...');
    setCurrentFilePath(filePath); // Update currentFilePath state
    try {
      const content = await getFileContent(roomIdRef.current, filePath); // Use ref
      if (monacoInstanceRef.current) {
        monacoInstanceRef.current.setValue(content); // Set content directly to editor
        const extension = filePath.split('.').pop();
        const language = monaco.editor.get
          ? monaco.editor.get(extension) || 'plaintext'
          : monaco.languages.getLanguages().find(lang => lang.extensions && lang.extensions.includes(`.${extension}`))?.id || 'plaintext';
        monaco.editor.setModelLanguage(monacoInstanceRef.current.getModel(), language);
      }
      setEditorContent(content); // Also update local state
    } catch (error) {
      setEditorContent(`Error loading file: ${error.message}`);
      console.error('Error loading file content:', error);
    }
  }, [roomId]);


  // Effect 1: Initialize Monaco Editor and its primary change listener ONCE
  useEffect(() => {
    if (editorRef.current && !monacoInstanceRef.current) {
      monacoInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: editorContentRef.current, // Use ref for initial value
        language: 'plaintext',
        theme: 'vs-dark',
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      });

      // Attach content change listener only once. It will use refs for latest values.
      monacoInstanceRef.current.onDidChangeModelContent(() => {
        const currentCode = monacoInstanceRef.current.getValue();
        // Update local state
        setEditorContent(currentCode);

        // Emit to server only if a file is open and socket is connected
        // Use refs for the latest socket, roomId, and currentFilePath
        if (currentFilePathRef.current && socketRef.current && socketRef.current.connected) {
          socketRef.current.emit('code-change', roomIdRef.current, currentFilePathRef.current, currentCode);
        }
      });
    }

    // Cleanup function for editor instance
    return () => {
      if (monacoInstanceRef.current) {
        monacoInstanceRef.current.dispose();
        monacoInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array: runs only once on mount


  // Effect 2: Manage Socket.IO listeners and initial data fetch (separate from editor init)
  useEffect(() => {
    if (!socket || !user) return; // Ensure socket and user are available

    // Join the room via Socket.IO
    socket.emit('join-room', roomId, user._id);

    // Listen for incoming code changes from other users
    socket.on('code-change', (receivedRoomId, filePath, code) => {
      // Only update editor if it's for the current room, the currently open file,
      // and the content is different from what's already in the editor
      // Use currentFilePathRef.current for the latest path
      if (receivedRoomId === roomIdRef.current && filePath === currentFilePathRef.current) {
        if (monacoInstanceRef.current && monacoInstanceRef.current.getValue() !== code) {
          monacoInstanceRef.current.setValue(code);
          setEditorContent(code); // Update local state to reflect incoming changes
        }
      }
    });

    // Listen for file system changes (e.g., create, delete, rename)
    socket.on('file-system-change', (receivedRoomId) => {
      if (receivedRoomId === roomIdRef.current) {
        fetchFileTree(); // Re-fetch file tree on any file system change
      }
    });

    // Listen for room users update
    socket.on('room-users-update', (activeUsers) => {
      setRoomUsers(activeUsers);
      console.log('Active users in room:', activeUsers);
    });

    // Listen for chat messages
    socket.on('chat-message', (messageData) => {
      setChatMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Fetch initial file tree
    fetchFileTree();

    // Cleanup for socket listeners
    return () => {
      if (socket) {
        socket.emit('leave-room', roomId, user._id);
        socket.off('code-change');
        socket.off('room-users-update');
        socket.off('chat-message');
        socket.off('file-system-change');
      }
    };
  }, [socket, roomId, user, fetchFileTree]); // Dependencies for this effect (currentFilePath is not here)


  // Handle saving the current file content
  const handleSaveFile = async () => {
    if (!currentFilePath) {
      alert('No file open to save.');
      return;
    }
    try {
      await updateFileContent(roomId, currentFilePath, editorContent);
      alert('File saved successfully!');
    } catch (error) {
      alert('Failed to save file: ' + (error.response?.data?.message || error.message));
      console.error('Error saving file:', error);
    }
  };

  // Handle sending chat messages
  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (newChatMessage.trim() && socket && user) {
      const messageData = {
        senderId: user._id,
        senderName: user.username || user.fullName,
        text: newChatMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      socket.emit('chat-message', roomId, messageData);
      setNewChatMessage('');
    }
  };

  // Handle creating new file/folder
  const handleCreateNewNode = async (e) => {
    e.preventDefault();
    setNewNodeError('');
    if (!newNodeName.trim()) {
      setNewNodeError('Name cannot be empty.');
      return;
    }
    try {
      await createNode(roomId, newNodeName.trim(), newNodeIsFolder);
      setShowNewNodeModal(false);
      setNewNodeName('');
      setNewNodeIsFolder(false);
      fetchFileTree();
      socket.emit('file-system-change', roomId);
    } catch (error) {
      setNewNodeError(error.response?.data?.message || 'Failed to create.');
      console.error('Error creating new node:', error);
    }
  };

  // Handle deleting a file/folder
  const handleDeleteNode = async (nodePath) => {
    if (window.confirm(`Are you sure you want to delete ${nodePath}?`)) {
      try {
        await deleteNode(roomId, nodePath);
        fetchFileTree();
        socket.emit('file-system-change', roomId);
        if (currentFilePath === nodePath) {
          setEditorContent('// File deleted. Select another file to code!');
          setCurrentFilePath('');
        }
      } catch (error) {
        alert('Failed to delete: ' + (error.response?.data?.message || error.message));
        console.error('Error deleting node:', error);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      await uploadFile(roomId, file, '');
      alert('File uploaded successfully!');
      fetchFileTree();
      socket.emit('file-system-change', roomId);
    } catch (error) {
      alert('Failed to upload file: ' + (error.response?.data?.message || error.message));
      console.error('Error uploading file:', error);
    } finally {
      setUploadingFile(false);
      fileInputRef.current.value = null;
    }
  };


  return (
    <div className="min-h-screen bg-primary-dark text-white flex flex-col">
      <Header roomId={roomId} isConnected={isConnected} />

      <div className="flex flex-grow">
        {/* Left Sidebar: File Explorer */}
        <FileExplorer
          loadingFiles={loadingFiles}
          fileError={fileError}
          fileTree={fileTree}
          roomUsers={roomUsers}
          onFileSelect={loadFileIntoEditor}
          onDeleteNode={handleDeleteNode}
          setShowNewNodeModal={setShowNewNodeModal}
          onFileUpload={handleFileUpload}
          uploadingFile={uploadingFile}
          fileInputRef={fileInputRef}
        />

        {/* Main Content: Code Editor & Whiteboard */}
        <div className="flex-grow flex flex-col">
          <CodeEditor
            editorRef={editorRef}
            currentFilePath={currentFilePath}
            onSaveFile={handleSaveFile}
          />
          <div className="bg-gray-900 p-4 border-t border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Whiteboard</h2>
            <div className="bg-gray-800 h-48 rounded-md flex items-center justify-center text-gray-500">
              Whiteboard canvas will go here.
            </div>
          </div>
        </div>

        {/* Right Sidebar: Chat */}
        <Chat
          chatMessages={chatMessages}
          user={user}
          newChatMessage={newChatMessage}
          setNewChatMessage={setNewChatMessage}
          onSendChatMessage={handleSendChatMessage}
        />
      </div>

      {/* New File/Folder Modal */}
      {showNewNodeModal && (
        <NewNodeModal
          newNodeName={newNodeName}
          setNewNodeName={setNewNodeName}
          newNodeIsFolder={newNodeIsFolder}
          setNewNodeIsFolder={setNewNodeIsFolder}
          newNodeError={newNodeError}
          onClose={() => setShowNewNodeModal(false)}
          onCreateNode={handleCreateNewNode}
        />
      )}
    </div>
  );
};

export default Room;