import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import PinListPage from '../pins/PinListPage';
import UserListPage from '../pins/UserListPage';

const PinTable: React.FC = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState('Button 1');

    const handleButtonClick = (buttonName) => {
        setContent(buttonName);
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <Container style={{ width: '1500px', height: '1000px' }}>
            <div style={{ display: 'flex', width: '100%', height: 'auto' }}>
                <div style={{ flex: '0 0 50%' }}>
                    <h3>Find your place</h3>
                    <div id="map" style={{ height: '500px', width: '100%' }}></div>
                    <Button href='pincreate' className = "btn btn-secondary mt-3">Add a pin</Button>
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
                        <UserListPage />
                    </div>

                    <div>
                    <h1>Here you can login</h1>
                    <button onClick={navigateToLogin}>Login</button>
                    </div>


                </div>
            </div>
            <div style={{ backgroundColor: '#b4d0ff', height: '100px' }}>
            <p>Laget av Therese Trollbu, Solveig Jørgensen og Ingeborg Randen</p>
            </div>
        </Container>
    );
};

export default PinTable;