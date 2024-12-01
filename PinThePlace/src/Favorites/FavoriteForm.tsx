import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Pin } from '../types/pin';
import {User} from '../types/user';
import {Favorite} from '../types/favorite';

// import API_URL from '../apiConfig';

interface FavoriteFormProps {
    favoritedpin?: Pin;
    isUpdate?: boolean;
    existingFavorite?:Favorite;
    favoriteId? : number;
    onFavoriteChanged: (newFavorite: Favorite) => void;
}

const FavoriteForm: React.FC<FavoriteFormProps> = ({
  onFavoriteChanged,
   favoritedpin,
   isUpdate=false,
   existingFavorite

   }) => {

    const [category, setCategory] = useState<string>(existingFavorite?.category || '');

    const handleSubmit = async (event: React.FormEvent)=>{
        event.preventDefault()
        const userId = sessionStorage.getItem('userId');

        const favorite: Favorite = {
            favoriteId: isUpdate ? existingFavorite?.favoriteId : undefined,
            pinId: isUpdate ? existingFavorite?.pinId : favoritedpin?.pinId,
            userId: userId,
            madeby: isUpdate ? existingFavorite?.madeby : favoritedpin?.userName,
            category: category
        };
        onFavoriteChanged(favorite);
        };
 

  
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1); 
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFavoriteCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />       
      </Form.Group>

      <Button variant="primary" type="submit">{isUpdate ? 'Update Favorite' : 'Save Favorite!'}</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
    </Form>
  );
};

export default FavoriteForm;