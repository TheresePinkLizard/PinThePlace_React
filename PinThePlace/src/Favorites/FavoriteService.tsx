import API_URL from '../apiConfig'; 

const headers = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response: Response) => {
    if (response.ok) {  // HTTP status code success 200-299
      if (response.status === 204) { // Delete returns 204 No content
        return null;
      }
      return response.json(); // other returns response body as JSON
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Network response was not ok');
    }
  };

  // Get favoritelist
    export const fetchFavorites = async () => {
    const response = await fetch(`${API_URL}/api/favoriteapi/favoritelist`);
    return handleResponse(response);
  };

  // Delete pin
    export const deleteFavorite = async (FavoriteId: number) => {
    const response = await fetch(`${API_URL}/api/favoriteapi/delete/${FavoriteId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
    };




