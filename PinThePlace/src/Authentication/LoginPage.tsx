import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import API_URL from '../apiConfig';


import * as LoginService from './LoginService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      const data = await LoginService.fetchLogin(username,password);
   

      sessionStorage.setItem('userToken',data.token);
      sessionStorage.setItem('username',username);
      sessionStorage.setItem('userId',data.userId);

      navigate(-1);
    } catch (error) {
      console.error("There was an error", error);
      setError('Wrong username or password. Please try again');
    }
  };

  return (
    <div>
        <div className='text-center loginTitle'> <h1>Log in page</h1></div>
        <div className='loginText text-center'>
        <form onSubmit={onSubmit}>
      
        <p>Username: <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" /></p>
        
        <p>Password: <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" /></p>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* shows errormessage */}
        {loading && <p>Logger inn...</p>}
        <input type="submit" />
      </form>
    </div>
   </div>
  );
};

export default LoginPage;