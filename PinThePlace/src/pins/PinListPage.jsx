import React, {useState, useEffect} from 'react';
import { Card, Container, Row, Col, Table, Button } from 'react-bootstrap';

const API_URL = 'http://localhost:5056'

const PinListPage = () => {

        const [pins, setPins] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const fetchPins = async () => {
            setLoading(true); // Set loading to true when starting the fetch
            setError(null);   // Clear any previous errors
        try {
            const response = await fetch(`${API_URL}/api/pinapi/pinlist`); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
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

    
    return (
        <Container>
        <Row>
            {pins.map(pin => (
                <Col xs={12} key={pin.PinId}>
                    <Card style={{ marginBottom: '20px' }}>
                        <Row className="no-gutters">
                            <Col md={6}>
                                <Card.Body>
                                    <Card.Title>{pin.Name}</Card.Title>
                                    <Card.Text>Rating: {pin.Rating}</Card.Text>
                                    <Card.Text>Comment: {pin.Comment}</Card.Text>
                                </Card.Body>
                            </Col>
                            <Col md={6}>
                                <div className="image-container">
                                    <Card.Img variant="top" src={`${API_URL}${pin.ImageUrl}`} alt={pin.Name}/>
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