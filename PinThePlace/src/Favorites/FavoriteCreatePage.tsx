import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteForm from './FavoriteForm';
import { Pin } from '../types/pin';
import {Favorite} from '../types/favorite';
import API_URL from '../apiConfig';
import { useLocation } from 'react-router-dom';


import * as FavoriteService from './FavoriteService';

const FavoriteCreatePage: React.FC = () => {
  // to transfer longitude and latitude
  const location = useLocation();
  const { latLong } = location.state || { latLong: { lat: 0, long: 0 } }; //Default to 0,0 if no latLong was passed
  const { favoritedpin }=location.state;

  const navigate = useNavigate(); // Create a navigate function
  const handleFavoriteCreated = async (favorite: Favorite) => {
    try {
      const data = await FavoriteService.SaveFavorite(favorite);
      console.log('Favorite created successfully:', data);
      navigate('../table'); // Navigate back after successful creation
    } catch (error) {
      console.error('There was a problem with the save operation:', error);
    }
  }
  
  return (
    <div>
      <h2>Save Favorite</h2>
      <h3>Give the pin a category to easily group your favorite pins</h3>
      <FavoriteForm favoritedpin={favoritedpin} onFavoriteChanged={handleFavoriteCreated}/> 
    </div>
  );
};

export default FavoriteCreatePage;