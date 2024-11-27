import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PinForm from './PinForm';
import {Pin} from '../types/pin';
import API_URL from '../apiConfig';


const PinUpdatePage: React.FC = () => {
    const {pinId} = useParams<{pinId: string}>();
    const navigate = useNavigate();
    const [pin,setPin] = useState<Pin | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPin = async () => {
          try {
            const response = await fetch(`${API_URL}/api/pinapi/${pinId}`); // default Get
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
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

    
    const handlePinUpdated = async (pin: Pin) => {

        try {
          const response = await fetch(`${API_URL}/api/pinapi/update/${pin.pinId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pin),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
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