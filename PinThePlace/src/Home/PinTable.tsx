import React, { useState, useEffect, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import PinListPage from '../pins/PinListPage';
import '../style.css';
import MyPinListPage from '../pins/MyPinListPage';


const PinTable: React.FC = () => {
  const [content, setContent] = useState('Button 1');

  const handleButtonClick = (buttonName) => {
    setContent(buttonName);
  };

  const mapRef = useRef(null); // This creates a reference to your map div

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = L.map(mapRef.current).setView([59.9139,10.7522],13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    const provider = new OpenStreetMapProvider();
    
    const searchControl = (GeoSearchControl as any)({
        provider: provider,
      });

    map.addControl(searchControl);

    return () => {
        map.remove();
      };
  }, []);
    return (
        <Container style={{ width: '1500px', height: '1000px' }}>
            <div style={{ display: 'flex', width: '100%', height: 'auto' }}>
                <div style={{ flex: '0 0 50%' }}>
                    <h3>Find your place</h3>
                    <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div> {/* Use the ref here */}
                    <Button href='pincreate' className = "btn addpinButton mt-3">Add a pin</Button>
                </div>
                <div style={{ flex: '1' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button className='feedButton' variant="primary" onClick={() => handleButtonClick('Button 1')}>Feed</Button>
                    <Button className='mypinsButton' variant="secondary" onClick={() => handleButtonClick('Button 2')}>My Pins</Button>
                    </div>
                    <div id="feedwindow" className='contentwindow' style={{ display: content === 'Button 1' ? 'block' : 'none', overflow: 'auto', width: '500px', height: '550px'}}>
                        <PinListPage />
                    </div>
                    <div id="favwindow" className='contentwindow2' style={{ display: content === 'Button 2' ? 'block' : 'none', overflow: 'auto', width: '500px', height: '550px' }}>
                        <UserListPage />
                    </div>
                    </div>
                </div>
            <div className='footer'>
            <p>Laget av Therese Trollbu, Solveig Jørgensen og Ingeborg Randen</p>
            </div>
        </Container>
    );
};

export default PinTable;