import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import FavoriteForm from './FavoriteForm';
import {Favorite} from '../types/favorite';
import API_URL from '../apiConfig';

import * as FavoriteService from './FavoriteService';


const FavoriteUpdatePage: React.FC = () => {
    const {favoriteId} = useParams<{favoriteId: string}>();
    const navigate = useNavigate();
    const [favorite,setFavorite] = useState<Favorite | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavorite = async () => {
          try {
            const data = await FavoriteService.fetchFavoriteById(favoriteId);
            // sets longitude and latitude to be in pin
            setFavorite(data);

          } catch (error) {
            setError('Failed to fetch item');
            console.error('There was a problem with the fetch operation:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchFavorite();
    }, [favoriteId]);

    
    const handleFavoriteUpdated = async (favorite: Favorite) => {

        try {
          const data = await FavoriteService.updateFavorite(favoriteId, favorite);
          console.log('Favorite updated successfully:', data);
          navigate('/table'); // Navigate back after successful creation
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;
      if (!favorite) return <p>No pin found</p>;
      
      return (
        <div>
          <h2>Update Pin</h2>
          <FavoriteForm onFavoriteChanged={handleFavoriteUpdated} favoriteId={Number(favorite.favoriteId)} isUpdate={true} existingFavorite={favorite} />
        </div>
      );
    };
    
    export default FavoriteUpdatePage;