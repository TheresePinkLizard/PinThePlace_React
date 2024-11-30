import React from 'react';
import { useNavigate } from 'react-router-dom';
import PinForm from './PinForm';
import { Pin } from '../types/pin';
import API_URL from '../apiConfig';
import { useLocation } from 'react-router-dom';
// const API_URL = 'http://localhost:5043'

import * as PinService from './PinService';

const PinCreatePage: React.FC = () => {
  // to transfer longitude and latitude
  const location = useLocation();
  const { latLong } = location.state || { latLong: { lat: 0, long: 0 } }; //Default to 0,0 if no latLong was passed

  const navigate = useNavigate(); // Create a navigate function
  const handlePinCreated = async (pin: FormData) => {
    try {
      const data = await PinService.createPin(pin);
      console.log('Pin created successfully:', data);
      navigate('/table'); // Navigate back after successful creation
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  return (
    <div>
      <h2>Create New Pin</h2>
      <PinForm onPinChanged={handlePinCreated} latLong={latLong}/> 
    </div>
  );
};

export default PinCreatePage;