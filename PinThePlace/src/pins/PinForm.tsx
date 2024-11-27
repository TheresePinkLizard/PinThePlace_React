import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Pin } from '../types/pin';

// import API_URL from '../apiConfig';

interface PinFormProps {
  onPinChanged: (newPin: Pin) => void;
  pinId?: number;
}

const PinForm: React.FC<PinFormProps> = ({onPinChanged, pinId}) => {
  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [dateCreated, setDateCreated] = useState<Date>(new Date());
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');


  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1); // This will navigate back one step in the history
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const pin: Pin = { pinId, name, rating, comment, imageUrl, latitude, longitude, uploadedImage, dateCreated, userId, userName};
    onPinChanged(pin); // Call the passed function with the item data
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formPinName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter pin name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          pattern="[0-9a-zA-ZæøåÆØÅ ]*$" // Regular expression pattern
          title="The Name must be numbers or letters"
        />       
      </Form.Group>

      <Form.Group controlId="formPinRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter pin rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          min="1"
          max="5"
        />
      </Form.Group>

      <Form.Group controlId="formPinComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter pin comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={200} // Regular expression pattern
          title="The comment can only be 200 characters"

        />
      </Form.Group>

      <Form.Group controlId="formPinImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPinLatitude">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(Number(e.target.value))}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPinLongitude">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(Number(e.target.value))}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPinUploadedImage">
        <Form.Label>Uploaded Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => { const target = e.target as HTMLInputElement; // Typecast til HTMLInputElement
            setUploadedImage(target.files ? target.files[0] : undefined); }}
        />
      </Form.Group>



      <Form.Group controlId="formPinDateCreated">
        <Form.Label>Date Created</Form.Label>
        <Form.Control
          type="date"
          value={dateCreated ? dateCreated.toISOString().substring(0, 10) : ''}
          onChange={(e) => setDateCreated(e.target.value ? new Date(e.target.value) : null)}
        />
      </Form.Group>

    
      <Form.Group controlId="formPinUserId">
        <Form.Label>UserId</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter userId"
          value={userId}
          onChange={(e) =>setUserId(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="formPinUserName">
        <Form.Label>UserName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter userName"
          value={userName}
          onChange={(e) =>setUserName(e.target.value)} 
        />
      </Form.Group>



      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button variant="primary" type="submit">Create Pin!</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
    </Form>
  );
};

export default PinForm;