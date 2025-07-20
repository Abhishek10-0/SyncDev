import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#181C2A] to-[#181C2A]">
      <div className="bg-[#23263A] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#23263A] mb-4">
          <span role="img" aria-label="logo" className="text-4xl">💻</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Sign Up for CodeSync</h2>
        <p className="text-[#A1A6C8] text-sm mb-6">Collaborative coding platform for developers</p>
        <button className="w-full flex items-center justify-center gap-2 bg-[#23263A] border border-[#3B3F5C] text-white py-2 rounded-lg mb-2 hover:bg-[#23263A]/80 transition">
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2 24 2 15.1 2 7.6 7.6 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.8 37 24 37 24 37c-5.8 0-10.7-3.1-13.3-7.7l-7 5.4C7.6 40.4 15.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"/></g></svg>
          Continue with Google
        </button>
        <div className="text-[#A1A6C8] text-xs my-2">OR CONTINUE WITH</div>
        <button className="w-full flex items-center justify-center gap-2 bg-[#23263A] border border-[#3B3F5C] text-white py-2 rounded-lg mb-2 hover:bg-[#23263A]/80 transition">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.66 8.84 8.32 9.74c.61.11.84-.26.84-.58c0-.29-.01-1.05-.02-2.06c-3.39.74-4.11-1.63-4.11-1.63c-.55-1.39-1.34-1.76-1.34-1.76c-1.09-.75.08-.74.08-.74c1.2.08 1.83 1.23 1.83 1.23c1.07 1.83 2.8 1.3 3.49.99c.11-.78.42-1.3.76-1.6c-2.71-.31-5.56-1.36-5.56-6.06c0-1.34.47-2.44 1.23-3.3c-.12-.31-.53-1.56.12-3.25c0 0 1.01-.32 3.3 1.23c.96-.27 1.99-.41 3.01-.41c1.02 0 2.05.14 3.01.41c2.29-1.55 3.3-1.23 3.3-1.23c.65 1.69.24 2.94.12 3.25c.76.86 1.23 1.96 1.23 3.3c0 4.71-2.85 5.75-5.57 6.06c.43.37.81 1.1.81 2.22c0 1.6-.01 2.89-.01 3.28c0 .32.22.7.85.58C18.34 20.84 22 16.84 22 12c0-5.52-4.48-10-10-10z"/></svg>
          Continue with GitHub
        </button>
        <div className="text-[#A1A6C8] text-xs my-2">OR</div>
        <form className="w-full flex flex-col gap-3">
          <input type="email" placeholder="Email" required className="px-4 py-2 rounded-lg bg-[#23263A] border border-[#3B3F5C] text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" />
          <input type="password" placeholder="Password" required className="px-4 py-2 rounded-lg bg-[#23263A] border border-[#3B3F5C] text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" />
          <button type="submit" className="w-full bg-[#6C63FF] text-white py-2 rounded-lg font-semibold hover:bg-[#5548c8] transition">Sign up with Email</button>
        </form>
        <div className="text-[#A1A6C8] text-xs mt-4">
          Already have an account? <a href="/login" className="text-[#6C63FF] hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Signup; 