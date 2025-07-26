// codesync-frontend/src/components/auth/AuthForm.jsx
// Reusable form component for Login and Signup.

import React, { useState } from 'react';
import Input from '../ui/Input.jsx'; // Import the reusable Input component
import Button from '../ui/Button.jsx'; // Import the reusable Button component
import { useAuth } from '../../context/AuthContext.jsx'; // Import useAuth hook

const AuthForm = ({ isSignup }) => {
  const { login, signup } = useAuth(); // Get login/signup functions from AuthContext
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await signup(username, email, password, fullName);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignup && (
        <>
          <Input
            label="Full Name"
            id="fullName"
            type="text"
            placeholder="John Developer"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            label="Username"
            id="username"
            type="text"
            placeholder="@johndeveloper"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </>
      )}
      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="developer@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        id="password"
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {isSignup && (
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In with Email')}
      </Button>
    </form>
  );
};

export default AuthForm;
