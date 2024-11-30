import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;