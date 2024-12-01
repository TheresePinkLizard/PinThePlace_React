import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (username, password) => {
  const response = await fetch('http://localhost:5056/Account/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
  
      console.log(data);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;