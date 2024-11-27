import React from 'react';
import { useNavigate } from 'react-router-dom';
import PinForm from './PinForm';
import { Pin } from '../types/pin';
import API_URL from '../apiConfig';
// const API_URL = 'http://localhost:5043'

const PinCreatePage: React.FC = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handlePinCreated = async (pin: Pin) => {
    try {
      const response = await fetch(`${API_URL}/api/pinapi/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pin),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Pin created successfully:', data);
      navigate('/pins'); // Navigate back after successful creation
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  return (
    <div>
      <h2>Create New Pin</h2>
      <PinForm onPinChanged={handlePinCreated}/>
    </div>
  );
};

export default PinCreatePage;