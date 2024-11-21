import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import PinListPage from '../pins/PinListPage';

const HomePage = () => {
    const [content, setContent] = useState(null);

    const handleButtonClick = (buttonName) => {
        setContent(buttonName);
    };

    return (
        <Container style={{ display: 'flex', width: '1000px', height: '600px' }}>
            <div style={{ flex: '0 0 50%' }}>
                <h3>Find your place</h3>
                <div id="map" style={{ height: '500px', width: '100%' }}></div>
                <Button variant="secondary" onClick={() => handleButtonClick('Add a pin')}>Add a pin</Button>
            </div>
            <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button variant="primary" onClick={() => handleButtonClick('Button 1')}>Feed</Button>
                    <Button variant="secondary" onClick={() => handleButtonClick('Button 2')}>My Pins</Button>
                </div>
                <div id="feedwindow" style={{ display: content === 'Button 1' ? 'block' : 'none', overflow: 'auto', width: '500px', height: '550px'}}>
                    <PinListPage />
                </div>
                <div id="favwindow" style={{ display: content === 'Button 2' ? 'block' : 'none', overflow: 'auto', width: '500px', height: '550px' }}>
                    {'You clicked Button 2'}
                </div>
            </div>
        </Container>
    );
};

export default HomePage;