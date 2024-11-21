import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const PinListPage = () => {
    // Mock data
    const pins = [
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

    
    return (
        <Container>
            <Row>
                {pins.map(pin => (
                    <Col xs={12} key={pin.PinId}>  
                        <Card style={{ marginBottom: '20px' }}>
                            <Card.Img variant="top" src={pin.ImageUrl} alt={pin.Name} />
                            <Card.Body>
                                <Card.Title>{pin.Name}</Card.Title>
                                <Card.Text>Rating: {pin.Rating}</Card.Text>
                                <Card.Text>Comment: {pin.Comment}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PinListPage;