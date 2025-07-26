// codesync-frontend/src/pages/AuthPage.jsx
// This component will serve as the main page for user authentication (Login/Signup).
// Updated to integrate AuthForm and SocialButtons.

import React, { useState } from 'react';
import AuthForm from '../components/auth/AuthForm.jsx';
import SocialButtons from '../components/auth/SocialButtons.jsx';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark p-4">
      <div className="bg-secondary-dark p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-accent-blue p-3 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 4l-4 4 4 4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center text-white">Welcome to CodeSync</h1>
          <p className="text-center text-gray-400">Collaborative coding platform for developers</p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          {isSignup ? 'Join CodeSync' : 'Sign In'}
        </h2>
        <p className="text-center text-gray-400 mb-8">
          {isSignup ? 'Start collaborating with developers worldwide' : 'Choose your preferred method to continue'}
        </p>

        <SocialButtons />

        <div className="my-8 flex items-center">
          <hr className="flex-grow border-gray-700" />
          <span className="px-4 text-gray-500 uppercase text-sm">Or</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <AuthForm isSignup={isSignup} />

        <p className="text-center text-gray-400 text-sm mt-8">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-accent-blue hover:underline focus:outline-none"
          >
            {isSignup ? "Sign In" : "Sign up"}
          </button>
        </p>

        <p className="text-center text-gray-500 text-xs mt-8">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-accent-blue hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-accent-blue hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
