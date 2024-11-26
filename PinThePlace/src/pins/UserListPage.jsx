import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const UserListPage = () => {
    // Mock data
    const userPins = [
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
        }
    ];

    return (
        <Container>
        <Row>
            {userPins.map(pin => (
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
                                    <Card.Img variant="top" src={pin.ImageUrl} alt={pin.Name} />
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

export default UserListPage;