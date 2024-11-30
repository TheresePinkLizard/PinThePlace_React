import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PinForm from './PinForm';
import {Pin} from '../types/pin';
import API_URL from '../apiConfig';
import { useLocation } from 'react-router-dom';

import * as PinService from './PinService';


const PinUpdatePage: React.FC = () => {
    const {pinId} = useParams<{pinId: string}>();
    const navigate = useNavigate();
    const [pin,setPin] = useState<Pin | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPin = async () => {
          try {
            const data = await PinService.fetchPinById(pinId);
            // sets longitude and latitude to be in pin
            setPin(data);

          } catch (error) {
            setError('Failed to fetch item');
            console.error('There was a problem with the fetch operation:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchPin();
    }, [pinId]);

    
    const handlePinUpdated = async (pin: FormData) => {

        try {
          const data = await PinService.updatePin(Number(pinId), pin);
          console.log('Item updated successfully:', data);
          navigate('/items'); // Navigate back after successful creation
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;
      if (!pin) return <p>No pin found</p>;
      
      return (
        <div>
          <h2>Update Pin</h2>
          <PinForm onPinChanged={handlePinUpdated} pinId={pin.pinId} isUpdate={true} initialData={pin} />
        </div>
      );
    };
    
    export default PinUpdatePage;