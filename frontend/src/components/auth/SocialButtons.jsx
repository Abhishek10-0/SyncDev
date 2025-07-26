// codesync-frontend/src/components/auth/SocialButtons.jsx
// Component for Google and GitHub social login buttons.

import React from 'react';
import Button from '../ui/Button.jsx'; // Import the reusable Button component

const SocialButtons = () => {
  // Placeholder functions for social login.
  // In a real app, these would redirect to OAuth providers.
  const handleGoogleLogin = () => {
    console.log('Continue with Google clicked');
    // Implement Google OAuth flow here
  };

  const handleGitHubLogin = () => {
    console.log('Continue with GitHub clicked');
    // Implement GitHub OAuth flow here
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleGoogleLogin} variant="google" className="w-full">
        {/* You can add a Google icon here using an SVG or an icon library */}
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.24 10.24v3.52h6.08c-.24 1.44-.96 2.64-2.08 3.52l2.88 2.24c1.92-1.76 3.04-4.32 3.04-7.28 0-.8-.08-1.52-.24-2.24h-.08z" fill="#4285F4"/>
          <path d="M12.24 20.48c-3.12 0-5.76-1.68-7.28-4.24l-2.88 2.24c1.92 2.88 4.64 4.8 7.28 4.8 4.16 0 7.68-2.72 9.2-6.48l-2.88-2.24c-1.04 2.08-2.88 3.52-5.12 3.52z" fill="#34A853"/>
          <path d="M5.04 12.24c0-1.28.24-2.48.64-3.52l-2.88-2.24c-.8 1.44-1.28 3.04-1.28 4.96 0 1.92.48 3.52 1.28 4.96l2.88-2.24c-.4-.96-.64-2.16-.64-3.52z" fill="#FBBC05"/>
          <path d="M12.24 3.52c1.68 0 3.04.64 4.08 1.68l2.56-2.56c-1.68-1.52-3.84-2.4-6.64-2.4-4.16 0-7.68 2.72-9.2 6.48l2.88 2.24c1.04-2.08 2.88-3.52 5.12-3.52z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </Button>
      <Button onClick={handleGitHubLogin} variant="github" className="w-full">
        {/* You can add a GitHub icon here using an SVG or an icon library */}
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.47.087.677-.206.677-.458 0-.226-.007-.975-.011-1.912-2.784.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.089 2.91.835.09-.645.35-1.089.636-1.338-2.22-.253-4.555-1.113-4.555-4.956 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.272.097-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.701.112 2.502.324 1.909-1.296 2.747-1.025 2.747-1.025.546 1.379.203 2.406.1 2.654.64.698 1.027 1.591 1.027 2.682 0 3.853-2.339 4.69-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .254.207.545.682.456C21.133 20.19 24 16.425 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd" />
        </svg>
        Continue with GitHub
      </Button>
    </div>
  );
};

export default SocialButtons;
