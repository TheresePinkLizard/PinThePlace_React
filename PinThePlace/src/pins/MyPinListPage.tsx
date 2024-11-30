import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Pin } from '../types/pin';
import API_URL from '../apiConfig';
import * as PinService from './PinService';

//Tror denne trengs for å finne username
/* interface PinListPageProps {
    username: string; // Brukernavnet til den innloggede brukeren
} */


type MyPinListPageProps = {
    onCardClick: (lat: number, long: number, pinId: number) => void;
    selectedCard: any;
    setSelectedCard: React.Dispatch<React.SetStateAction<any>>;
    };
      
const PinListPage: React.FC<MyPinListPageProps>  =({ onCardClick, selectedCard, setSelectedCard }) =>  {

    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const username = sessionStorage.getItem('username');

    const fetchPins = async () => {
        if(!username) return;
        setLoading(true); // Set loading to true when starting the fetch
        setError(null);   // Clear any previous errors
        try {
            const data = await PinService.fetchPins(); // Hent alle pins
            setPins(data);
            console.log(data);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch pins.');
        } finally {
            setLoading(false); // Set loading to false once the fetch is complete
        }
    };

    useEffect(() => {
        fetchPins();
    }, []);

    const handlePinDeleted = async (pinId: number) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the pin ${pinId}?`);
        if (confirmDelete) {
            try {
                await PinService.deletePin(pinId);
                setPins((prevPins) => prevPins.filter((pin) => pin.pinId !== pinId));
                console.log('Pin deleted:', pinId);
            } catch (error) {
                console.error('Error deleting pin:', error);
                setError('Failed to delete pin.');
            }
        }
    };

    // Filtrér pins basert på brukernavn
    const userPins = pins.filter((pin) => pin.userName === username);

    // Legg til søkefunksjonalitet
    const filteredPins = searchQuery
        ? userPins.filter((pin) =>
              pin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              pin.rating.toString().includes(searchQuery) ||
              pin.userName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : userPins;
        
    if (!username) {
        return (
            <Container>
                <p>Please log in to view your pins.</p>
                </Container>
            );
        }

    return (
        <Container>
            {username && <div>Logged in as: {username}</div>}
            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search your pins by name, rating, or username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && filteredPins.length === 0 && <p>No pins match your search criteria.</p>}
            <Row>
                {filteredPins.map((pin) => (
                    <Col xs={12} key={pin.pinId}>
                        <Card style={{ marginBottom: '20px',backgroundColor: pin.pinId === selectedCard ? 'white' : 'initial' }} onClick={() => {onCardClick(pin.latitude, pin.longitude, pin.pinId);setSelectedCard(pin.pinId);}}>
                            <Row className="no-gutters">
                                <Col md={6}>
                                    <Card.Body>
                                        <Card.Title><strong>{pin.name}</strong></Card.Title>
                                        <Card.Text><strong>Rating: </strong>{pin.rating}</Card.Text>
                                        <Card.Text><strong>Date: </strong>
                                        {
                                            new Date(pin.dateCreated).toISOString().split('.')[0].replace('T', ' ')
                                        }
                                        </Card.Text>
                                        <Card.Text><strong>Comment: </strong>{pin.comment}</Card.Text>
                                        <Card.Text><strong>UserName: </strong>{pin.userName}</Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Button href={`/pinupdate/${pin.pinId}`} variant="primary">
                                                Update
                                            </Button>        
                                            <Button
                                                variant="danger"
                                                onClick={() => handlePinDeleted(pin.pinId)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Col>
                                <Col md={6}>
                                    <div className="image-container">
                                        {pin.imageUrl && <Card.Img
                                            variant="top"
                                            src={`${API_URL}${pin.imageUrl}`}
                                            alt={pin.name}
                                        />}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PinListPage;
