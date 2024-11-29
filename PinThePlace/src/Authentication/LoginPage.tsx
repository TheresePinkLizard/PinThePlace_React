import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import API_URL from '../apiConfig';
import jwt from 'jsonwebtoken';


import * as LoginService from './LoginService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const token = await LoginService.fetchLogin(username,password);
      const data = await token.json();
      //const decodedToken = jwt.decode(token);
      //const userId = decodedToken['userId'];

      sessionStorage.setItem('userToken',data.token);
      sessionStorage.setItem('username',username);
      sessionStorage.setItem('usedId',data.userId);

      navigate(-1);
    } catch (error) {
      console.error("There was an error", error);
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