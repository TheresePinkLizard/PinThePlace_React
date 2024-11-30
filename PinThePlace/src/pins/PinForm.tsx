import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Pin } from '../types/pin';

// import API_URL from '../apiConfig';

interface PinFormProps {
  onPinChanged: (newPin: FormData) => void;
  pinId?: number;
  isUpdate?: boolean;
  initialData?: Pin;
  latLong?: { lat: number, long: number }; // adding latitude longitude
}

const PinForm: React.FC<PinFormProps> = ({
  onPinChanged,
   pinId,
   isUpdate=false,
   initialData,
   latLong}) => {
  const [name, setName] = useState<string> (initialData?.name || '');
  const [rating, setRating] = useState<number>(initialData?.rating || 1);
  const [comment, setComment] = useState<string>(initialData?.comment || '');
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || '');
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [latitude, setLatitude] = useState<number>(latLong?.lat || 0); // give latlong datatype to store location
  const [longitude, setLongitude] = useState<number>(latLong?.long || 0);
  useEffect(() => {
    if (initialData) {
      setLatitude(initialData.latitude || 0);
      setLongitude(initialData.longitude || 0);
    }
  }, [initialData]);
  const [dateCreated, setDateCreated] = useState<Date>(initialData?.dateCreated || new Date());
  const [userId, setUserId] = useState<string>(sessionStorage.getItem('userId') || '');
  const [userName, setUserName] = useState<string>(sessionStorage.getItem('username') || '');


  //const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(-1); // This will navigate back one step in the history
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //To be able to upload an image we need to send it as FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating.toString());
    formData.append('comment',comment);
    formData.append('latitude',latitude.toString());
    formData.append('longitude',longitude.toString());
    if(uploadedImage) {
      formData.append('uploadedImage',uploadedImage);
    }
    const dateCreated = new Date();
    formData.append('dateCreated',dateCreated.toISOString());
    formData.append('userId',userId);
    formData.append('userName',userName);

    //const pin: Pin = { pinId, name, rating, comment, imageUrl, latitude, longitude, uploadedImage, dateCreated, userId, userName};
    onPinChanged(formData); // Call the passed function with the item data
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
          rows={2}
          placeholder="Enter pin comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={200} // Regular expression pattern
          title="The comment can only be 200 characters"

        />
      </Form.Group>

      <Form.Group controlId="formPinLatitude">
        <Form.Label>Latitude</Form.Label>
        <p>{latitude}</p>
      </Form.Group>

      <Form.Group controlId="formPinLongitude">
        <Form.Label>Longitude</Form.Label>
        <p>{longitude}</p>
      </Form.Group>

      <Form.Group controlId="formPinUploadedImage">
        <Form.Label>Uploaded Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => { const target = e.target as HTMLInputElement; // Typecast til HTMLInputElement
            setUploadedImage(target.files ? target.files[0] : undefined); }}
        />
      </Form.Group>

      <Button variant="primary" type="submit">{isUpdate ? 'Update Pin' : 'Create Pin!'}</Button>
      <Button variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
    </Form>
  );
};

export default PinForm;