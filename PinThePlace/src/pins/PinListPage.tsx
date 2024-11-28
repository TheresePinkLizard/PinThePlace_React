import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Card, Container, Row, Col, Table, Button, Form} from 'react-bootstrap';
import {Pin} from '../types/pin';
import PinTable from '../Home/PinTable';
import API_URL from '../apiConfig';

import * as PinService from './PinService';

const PinListPage: React.FC = () => {

        const [pins, setPins] = useState<Pin[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);
        const [searchQuery, setSearchQuery] = useState('');

        const fetchPins = async () => {
            setLoading(true); // Set loading to true when starting the fetch
            setError(null);   // Clear any previous errors
        try {
            const data = await PinService.fetchPins();
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

        const handlePinDeleted = async(pinId: number) => {
            const confirmDelete = window.confirm(`Are you sure you want to delete the pin ${pinId}?`);
            if (confirmDelete) {
              try {
                await PinService.deletePin(pinId);
                setPins(prevPins => prevPins.filter(pin => pin.pinId !== pinId));
                console.log('Pin deleted:', pinId);
              } catch (error) {
                console.error('Error deleting pin:', error);
                setError('Failed to delete pin.');
              }
            }
          }; 
        

        const filteredPins = searchQuery
        ? pins.filter(pin =>
            pin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pin.rating.toString().includes(searchQuery) ||
            pin.userName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : pins;


    return (
        <Container>
             <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search pins by name, rating, or username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && filteredPins.length === 0 && <p>No pins match your search criteria.</p>}
        <Row>
            {filteredPins.map(pin => (
                <Col xs={12} key={pin.pinId} className="mb-4">
                    <Card style={{ marginBottom: '20px' }}>
                        <Row className="no-gutters">
                            <Col md={6}>
                                <Card.Body>
                                    <Card.Title>{pin.name}</Card.Title>
                                    <Card.Text><strong>Rating: {pin.rating}</strong></Card.Text>
                                    <Card.Text>Date: {(pin.dateCreated).toString()}</Card.Text>
                                    <Card.Text><strong>Comment:</strong> {pin.comment}</Card.Text>
                                    <Card.Text><strong>UserName: </strong>{pin.userName}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Button href={`/pinupdate/${pin.pinId}`} variant="primary">Update</Button>
                                        <Button variant="danger" onClick={() => handlePinDeleted(pin.pinId)}>Delete</Button>
                                    </div>
                                </Card.Body>
                            </Col>
                            <Col md={6}>
                                <div className="image-container">
                                    <Card.Img variant="top" className="image-card" src={`${API_URL}${pin.imageUrl}`} alt={pin.name}/>
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

    // Mock data
    /*const pins = [
        {
            PinId: 1,
            Name: "Slottet",
            Rating: 4,
            Comment: "Kjempe fin arkitektur og park. Anbefales!",
            Latitude: 59.91731919136782,
            Longitude: 10.727738688356991,
            UserName: "user1",
            UserId: 1,
            ImageUrl: "/images/cat.jpg"
        },
        {
            PinId: 2,
            Name: "OsloMet",
            Rating: 5,
            Comment: "Bra skole. Anbefales!",
            Latitude: 59.921365321156706, 
            Longitude: 10.733315263484577,
            UserName: "user2",
            UserId: 2,
            ImageUrl: "/images/lynx.jpg"
        },
        {
            PinId: 3,
            Name: "Admin",
            Rating: 5,
            Comment: "Dette er en Admin pin!",
            Latitude: 59.921365321156706, 
            Longitude: 10.733315263484577,
            UserName: "admin",
            UserId: 3,
            ImageUrl: "/images/tiger.jpg"
        }
    ];
    */
