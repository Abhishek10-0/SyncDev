import React from 'react';

const Login = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 animated-gradient-bg">
        {/* Logo icon in gradient rounded square */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{background: 'linear-gradient(135deg, #377DFF 0%, #8F5CFF 100%)'}}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="none"/>
              <path d="M8.5 14L5.5 12L8.5 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.5 10L18.5 12L15.5 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 8.5L11 15.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-1">Welcome to SyncDev</h2>
          <p className="text-[#A1A6C8] text-base font-medium">Collaborative coding platform for developers</p>
        </div>
        <div className="bg-[#23283A] rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white mb-2">Sign In to SyncDev</h3>
          <p className="text-[#A1A6C8] text-base mb-6">Choose your preferred method to continue</p>
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#377DFF] to-[#8F5CFF] text-white py-3 rounded-lg mb-4 font-semibold shadow-md hover:from-[#377DFF]/90 hover:to-[#8F5CFF]/90 transition text-base">
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2 24 2 15.1 2 7.6 7.6 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.8 37 24 37 24 37c-5.8 0-10.7-3.1-13.3-7.7l-7 5.4C7.6 40.4 15.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.3 4.5 29.4 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20c11.1 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"/></g></svg>
            Continue with Google
          </button>
          <div className="text-[#A1A6C8] text-xs my-2 font-semibold tracking-wide">OR CONTINUE WITH</div>
          <button className="w-full flex items-center justify-center gap-2 bg-[#181C2A] text-white py-3 rounded-lg mb-4 font-semibold hover:bg-[#23263A] transition text-base">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.66 8.84 8.32 9.74c.61.11.84-.26.84-.58c0-.29-.01-1.05-.02-2.06c-3.39.74-4.11-1.63-4.11-1.63c-.55-1.39-1.34-1.76-1.34-1.76c-1.09-.75.08-.74.08-.74c1.2.08 1.83 1.23 1.83 1.23c1.07 1.83 2.8 1.3 3.49.99c.11-.78.42-1.3.76-1.6c-2.71-.31-5.56-1.36-5.56-6.06c0-1.34.47-2.44 1.23-3.3c-.12-.31-.53-1.56.12-3.25c0 0 1.01-.32 3.3 1.23c.96-.27 1.99-.41 3.01-.41c1.02 0 2.05.14 3.01.41c2.29-1.55 3.3-1.23 3.3-1.23c.65 1.69.24 2.94.12 3.25c.76.86 1.23 1.96 1.23 3.3c0 4.71-2.85 5.75-5.57 6.06c.43.37.81 1.1.81 2.22c0 1.6-.01 2.89-.01 3.28c0 .32.22.7.85.58C18.34 20.84 22 16.84 22 12c0-5.52-4.48-10-10-10z"/></svg>
            Continue with GitHub
          </button>
          <div className="text-[#A1A6C8] text-xs my-2 font-semibold tracking-wide">OR</div>
          <form className="w-full flex flex-col gap-3">
            <label className="text-white text-sm font-semibold" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="developer@example.com" required className="px-4 py-3 rounded-lg bg-[#23283A] text-[#A1A6C8] placeholder-[#A1A6C8] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" />
            <label className="text-white text-sm font-semibold" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="" required className="px-4 py-3 rounded-lg bg-[#23283A] text-[#A1A6C8] placeholder-[#A1A6C8] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]" />
            <button type="submit" className="w-full bg-[#181C2A] text-white py-3 rounded-lg font-semibold hover:bg-[#23263A] transition mt-2 text-base">Sign In with Email</button>
          </form>
          <div className="text-[#A1A6C8] text-sm mt-6">
            Don't have an account? <a href="/signup" className="text-[#4F8CFF] hover:underline">Sign up</a>
          </div>
        </div>
      </div>
      {/* Terms and Privacy Policy */}
      <div className="absolute bottom-4 left-0 w-full flex flex-col items-center">
        <p className="text-[#A1A6C8] text-xs text-center">
          By continuing, you agree to our <a href="#" className="underline hover:text-[#6C63FF]">Terms of Service</a> and <a href="#" className="underline hover:text-[#6C63FF]">Privacy Policy</a>
        </p>
      </div>
    </>
  );
};

export default Login; 