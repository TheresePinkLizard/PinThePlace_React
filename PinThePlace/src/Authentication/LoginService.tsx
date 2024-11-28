import API_URL from '../apiConfig'; // Update the path if necessary

const headers = {
  'Content-Type': 'application/json',
};


const handleResponse = async (response: Response) => {
    if (response.ok) {  // HTTP status code success 200-299
      if (response.status === 204) { // Detele returns 204 No content
        return null;
      }
      return response.json(); // other returns response body as JSON
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Network response was not ok');
    }
  };

//Login response 
export const fetchLogin = async (username,password) => {
    const response = await fetch(`${API_URL}/Account/login` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,password})
    });
    return handleResponse(response);
  };