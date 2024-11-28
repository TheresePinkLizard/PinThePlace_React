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

// Get pinlist
export const fetchPins = async () => {
  const response = await fetch(`${API_URL}/api/pinapi/pinlist`);
  return handleResponse(response);
};
// Get pin by id
export const fetchPinById = async (pinId: string) => {
  const response = await fetch(`${API_URL}/api/pinapi/${pinId}`);
  return handleResponse(response);
};
// Post create pin
export const createPin = async (pin: any) => {
  const response = await fetch(`${API_URL}/api/pinapi/create`, {
    method: 'POST',
    headers,
    body: JSON.stringify(pin),
  });
  return handleResponse(response);
};
// Put update pin
export const updatePin = async (pinId: number, pin: any) => {
  const response = await fetch(`${API_URL}/api/pinapi/update/${pinId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(pin),
  });
  return handleResponse(response);
};
// Delete pin
export const deletePin = async (pinId: number) => {
  const response = await fetch(`${API_URL}/api/pinapi/delete/${pinId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
