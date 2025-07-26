// codesync-frontend/src/pages/Dashboard.jsx
// This component will display the user's dashboard after login/signup.
// Updated to reflect the provided Dashboard UI image.

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // Import useAuth hook
import Button from '../components/ui/Button.jsx'; // Import Button component
import Input from '../components/ui/Input.jsx'; // Import Input component

const Dashboard = () => {
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Mock data for communities/rooms based on the UI image
  const communities = [
    {
      id: '1',
      name: 'React Developers',
      category: 'Frontend',
      trending: true,
      description: 'Building amazing UIs with React and TypeScript',
      contributors: '1,247',
      rooms: 8,
      time: '2 hours ago',
      status: 'Join Room' // Can be 'Join Room' or 'Leave'
    },
    {
      id: '2',
      name: 'Backend Engineers',
      category: 'Backend',
      trending: true,
      description: 'Node.js, Python, Go, and system design discussions',
      contributors: '892',
      rooms: 12,
      time: '5 minutes ago',
      status: 'Join Room'
    },
    {
      id: '3',
      name: 'DevOps & Cloud',
      category: 'DevOps',
      description: 'AWS, Docker, Kubernetes, CI/CD best practices',
      contributors: '634',
      rooms: 6,
      time: '1 hour ago',
      status: 'Join Room'
    },
    {
      id: '4',
      name: 'Open Source',
      category: 'Community',
      trending: true,
      description: 'Contributing to open source projects together',
      contributors: '2,103',
      rooms: 18,
      time: '30 minutes ago',
      status: 'Leave' // Example of a joined room
    },
    {
      id: '5',
      name: 'Machine Learning',
      category: 'AI/ML',
      description: 'AI/ML, algorithms, data science, and research',
      contributors: '766',
      rooms: 4,
      time: '3 hours ago',
      status: 'Join Room'
    },
    {
      id: '6',
      name: 'Mobile Development',
      category: 'Mobile',
      description: 'React Native, Flutter, iOS, and Android development',
      contributors: '543',
      rooms: 7,
      time: '45 minutes ago',
      status: 'Join Room'
    },
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || community.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile', 'Community', 'More Filters'];

  return (
    <div className="min-h-screen bg-primary-dark text-white p-8">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Discover and join developer communities</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="primary" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Create Community</span>
          </Button>
          <Button variant="secondary" className="flex items-center space-x-2">
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

      {/* Stats Cards */}
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
            <p className="text-4xl font-bold text-white">12</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map(community => (
            <div key={community.id} className="bg-secondary-dark p-6 rounded-lg shadow-md flex flex-col">
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
                  <span>{community.contributors} contributors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4" />
                  </svg>
                  <span>{community.rooms} rooms</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-xs">
                <span>{community.time}</span>
                <Button
                  variant={community.status === 'Leave' ? 'danger' : 'primary'}
                  className="py-1 px-3 text-sm"
                >
                  {community.status}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No communities found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
