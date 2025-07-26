// codesync-frontend/src/pages/Profile.jsx
// Placeholder for the user profile page.

import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams(); // Get userId from URL parameters

  return (
    <div className="min-h-screen bg-primary-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">User Profile: {userId}</h1>
      <div className="bg-secondary-dark p-8 rounded-lg shadow-lg">
        <p className="text-lg text-gray-300">This is the profile page for user ID: {userId}.</p>
        <p className="text-gray-400 mt-4">More profile details, created rooms, and contributions will be displayed here.</p>
      </div>
    </div>
  );
};

export default Profile; // Crucial default export
