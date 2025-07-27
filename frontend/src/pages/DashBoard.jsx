// codesync-frontend/src/pages/Dashboard.jsx
// This component will display the user's dashboard after login/signup.
// Updated to handle 'Community' and 'Coding Room' creation distinctly.
// 'View Room' button now handles joining if user is not a member.

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { getRooms, createRoom, joinRoom, leaveRoom } from '../api/roomApi.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [errorRooms, setErrorRooms] = useState('');

  // State for the modal and the type of room being created
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [roomTypeToCreate, setRoomTypeToCreate] = useState('coding-room'); // 'community' or 'coding-room'

  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const [newRoomCategory, setNewRoomCategory] = useState('Other');
  const [newRoomIsPublic, setNewRoomIsPublic] = useState(true);
  const [createRoomError, setCreateRoomError] = useState('');
  const [creatingRoom, setCreatingRoom] = useState(false);


  const fetchRooms = async () => {
    setLoadingRooms(true);
    setErrorRooms('');
    try {
      const data = await getRooms(); // Fetches all public rooms, regardless of type
      setRooms(data);
    } catch (error) {
      setErrorRooms('Failed to fetch rooms. Please try again.');
      console.error('Dashboard fetch rooms error:', error);
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const openCreateRoomModal = (type) => {
    setRoomTypeToCreate(type);
    setShowCreateRoomModal(true);
    // Reset form fields when opening modal
    setNewRoomName('');
    setNewRoomDescription('');
    setNewRoomCategory('Other');
    setNewRoomIsPublic(true);
    setCreateRoomError('');
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setCreatingRoom(true);
    setCreateRoomError('');
    try {
      const roomData = {
        name: newRoomName,
        description: newRoomDescription,
        category: newRoomCategory,
        type: roomTypeToCreate, // Send the determined type to the backend
        isPublic: newRoomIsPublic,
      };
      await createRoom(roomData);
      setShowCreateRoomModal(false); // Close modal
      fetchRooms(); // Refresh room list
    } catch (error) {
      setCreateRoomError(error.response?.data?.message || 'Failed to create room.');
    } finally {
      setCreatingRoom(false);
    }
  };

  const handleJoinLeaveRoom = async (roomId, currentStatus) => {
    try {
      if (currentStatus === 'Join Room') {
        await joinRoom(roomId);
      } else { // currentStatus === 'Leave'
        await leaveRoom(roomId);
      }
      fetchRooms(); // Refresh room list after action
    } catch (error) {
      console.error(`Failed to ${currentStatus === 'Join Room' ? 'join' : 'leave'} room:`, error);
      // Optionally show a toast/notification
    }
  };

  const handleViewRoom = async (community) => {
    const isMember = community.members.some(member => member._id === user._id);
    if (!isMember) {
      try {
        await joinRoom(community._id);
        fetchRooms(); // Refresh rooms to update membership status
      } catch (error) {
        console.error('Failed to join room before viewing:', error);
        // Optionally show an error message
        return; // Prevent navigation if join fails
      }
    }
    navigate(`/room/${community._id}`);
  };

  const filteredCommunities = rooms.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || community.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile', 'Community', 'Other'];

  return (
    <div className="min-h-screen bg-primary-dark text-white p-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Discover and join developer communities</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <Button variant="primary" className="flex items-center justify-center space-x-2" onClick={() => openCreateRoomModal('community')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Create Community</span>
          </Button>
          <Button variant="secondary" className="flex items-center justify-center space-x-2" onClick={() => openCreateRoomModal('coding-room')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Create Your Own Room</span>
          </Button>
          {user ? (
            <Button onClick={logout} variant="danger">Logout</Button>
          ) : null}
        </div>
      </div>

      {/* Stats Cards - These will remain static for now, dynamic fetching can be added later */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-secondary-dark p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-400">Communities Joined</h2>
            <p className="text-4xl font-bold text-white">3</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-2v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H3a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
          </svg>
        </div>
        <div className="bg-secondary-dark p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-400">Active Rooms</h2>
            <p className="text-4xl font-bold text-white">{rooms.length}</p> {/* Example: show count of fetched rooms */}
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4" />
          </svg>
        </div>
        <div className="bg-secondary-dark p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-400">Hours Coded</h2>
            <p className="text-4xl font-bold text-white">47</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="bg-secondary-dark p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-400">Contributions</h2>
            <p className="text-4xl font-bold text-white">156</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.329 1.176l1.519 4.674c.3.921-.755 1.688-1.539 1.175l-4.915-3.181a1 1 0 00-1.176 0l-4.915 3.181c-.784.513-1.838-.254-1.539-1.176l1.519-4.674a1 1 0 00-.329-1.176l-3.976-2.888c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Input
          type="text"
          placeholder="Search communities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? 'primary' : 'outline'}
              className="px-4 py-2 text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Community Room Cards */}
      <h2 className="text-3xl font-bold mb-6">Discover Communities</h2>
      {loadingRooms ? (
        <p className="text-center text-gray-400">Loading rooms...</p>
      ) : errorRooms ? (
        <p className="text-center text-red-500">{errorRooms}</p>
      ) : filteredCommunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map(community => {
            const isMember = user && community.members.some(member => member._id === user._id);
            return (
              <div key={community._id} className="bg-secondary-dark p-6 rounded-lg shadow-md flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white">{community.name}</h3>
                  {community.trending && (
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">Trending</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{community.description}</p>
                <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-2v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H3a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
                    </svg>
                    <span>{community.members.length} contributors</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4" />
                    </svg>
                    <span>{community.activeUsers.length} active</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-500 text-xs">
                  <span>Created: {new Date(community.createdAt).toLocaleDateString()}</span>
                  <Button
                    onClick={() => handleJoinLeaveRoom(community._id, isMember ? 'Leave' : 'Join Room')}
                    variant={isMember ? 'danger' : 'primary'}
                    className="py-1 px-3 text-sm"
                  >
                    {isMember ? 'Leave' : 'Join Room'}
                  </Button>
                  <Button
                    onClick={() => handleViewRoom(community)}
                    variant="secondary"
                    className="py-1 px-3 text-sm ml-2"
                  >
                    {isMember ? 'Go to Room' : 'View & Join Room'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-center col-span-full">No communities found matching your criteria.</p>
      )}

      {/* Create Room Modal */}
      {showCreateRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-secondary-dark p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {roomTypeToCreate === 'community' ? 'Create New Community' : 'Create New Coding Room'}
            </h2>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <Input
                label="Name"
                id="roomName"
                type="text"
                placeholder={roomTypeToCreate === 'community' ? 'My Awesome Community' : 'My Awesome Project'}
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                required
              />
              <Input
                label="Description"
                id="roomDescription"
                type="text"
                placeholder="A brief description of your room"
                value={newRoomDescription}
                onChange={(e) => setNewRoomDescription(e.target.value)}
                required
              />
              <div>
                <label htmlFor="roomCategory" className="block text-gray-300 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  id="roomCategory"
                  value={newRoomCategory}
                  onChange={(e) => setNewRoomCategory(e.target.value)}
                  className="shadow appearance-none border border-gray-700 rounded-md w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline focus:border-accent-blue transition-colors duration-200"
                >
                  {categories.filter(cat => cat !== 'All' && cat !== 'More Filters').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={newRoomIsPublic}
                  onChange={(e) => setNewRoomIsPublic(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-accent-blue rounded border-gray-600 bg-gray-700 focus:ring-accent-blue"
                />
                <label htmlFor="isPublic" className="text-gray-300">Public Room</label>
              </div>

              {createRoomError && <p className="text-red-500 text-sm text-center">{createRoomError}</p>}

              <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" variant="secondary" onClick={() => setShowCreateRoomModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={creatingRoom}>
                  {creatingRoom ? 'Creating...' : (roomTypeToCreate === 'community' ? 'Create Community' : 'Create Room')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
