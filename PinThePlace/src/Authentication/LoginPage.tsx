import React, { useState } from 'react';
import API_URL from '../apiConfig';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`${API_URL}/Account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      // Handle successful login
      const { token } = await response.json();
      localStorage.setItem('userToken', token);
    } else {
      // Handle error during login
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      
      <input type="submit" />
    </form>
  );
};

export default LoginPage;