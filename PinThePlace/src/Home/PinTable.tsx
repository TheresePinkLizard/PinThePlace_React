import React, { useState, useEffect, useRef } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
//import L from 'leaflet';
//import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
//import 'leaflet/dist/leaflet.css';
import PinListPage from '../pins/PinListPage';
import UserListPage from '../pins/UserListPage';
import '../style.css';
import MyPinListPage from '../pins/MyPinListPage';
import FavoriteListPage from '../Favorites/FavoriteListPage';

declare global {
  interface Window {L: any; GeoSearch: any;}
}
const {GeoSearchControl, OpenStreetMapProvider} = window.GeoSearch; 
const L : any = window.L;


const PinTable: React.FC = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState('Button 1');
    //const [content, setContent] = useState('Button 1');

  //const [content, setContent] = useState('Button 1');
  const [latLong, setLatLong] = useState({lat: null, long: null}); // to store lat and long
  
  // buttons to switch between feed and mypins
  const currentMarker = useRef(null); 
  const handleButtonClick = (buttonName) => {
    setContent(buttonName);
  };

    const navigateToLogin = () => {
        navigate('/login');
    };

 // const mapRef = useRef(null); // This creates a reference to your map div
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  //const navigate = useNavigate();

  // initialize the Leaflet map and its controls
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    //initialize leaflet map
    const map = L.map(mapRef.current).setView([59.9139,10.7522],13);
    mapInstance.current = map;

    // add tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    
   // initialize and add geosearchcontrol
    const provider = new OpenStreetMapProvider();
    const searchControl = (GeoSearchControl as any)({
      provider: provider,
      autoClose: true,
      searchLabel: 'Enter address',
      });

    map.addControl(searchControl);
      // function to handle map click events
     // Makes a pop up that shows the clicked places' latitude and longitude 
     function onMapClick(e) {
      var lat = e.latlng.lat.toFixed(6);
      var long = e.latlng.lng.toFixed(6);

      if (currentMarker.current){
          map.removeLayer(currentMarker.current);
      }
      currentMarker.current = L.marker(e.latlng).addTo(map);
     
      // creating popup on the map with longitude and latitude
      //currentMarker.current.bindPopup(`Latitude: ${lat} <br> Longitude: ${long}`).openPopup();
      setLatLong({lat, long});
    }

    map.on('click', onMapClick);

     // Handler for 'geosearch/showlocation' event
    map.on('geosearch/showlocation', function(e) {
        if (e.location){
            var lat = e.location.y;
            var long = e.location.x;

            if (currentMarker.current){
                map.removeLayer(currentMarker.current);
            }
            currentMarker.current = L.marker([lat,long]).addTo(map);

             // creating popup on the map with longitude and latitude
            currentMarker.current.bindPopup(`Latitude: ${lat} <br> Longitude: ${long}`).openPopup();

            setLatLong({lat, long});
        } else {
            console.error("location null");
        }
       
    });
    // to make sure map is not initialized several times, that creates error
    return () => {
        mapInstance.current.remove();
    };
  }, []);

  const handleCardClick = (lat: number, long: number) => {
    const map = mapInstance.current;
    // Remove the existing marker
    if (currentMarker.current) {
      map.removeLayer(currentMarker.current);
    }
    
    // Add a new marker
    currentMarker.current = L.marker([lat, long]).addTo(map);
    currentMarker.current.bindPopup(`Latitude: ${lat} <br> Longitude: ${long}`).openPopup();
    
    // Update the map's view
    map.setView([lat, long], 13);
    
    setLatLong({ lat, long });
  };

  // Function to handle add pin button click
  const handleAddPin = (e) => {
    if (!latLong.lat || !latLong.long) {
        e.preventDefault();
        alert('Please click on the map first before trying to add a pin!.');
    }else{
      // Navigate to the PinCreatePage and pass the latLong as state
      navigate('/pincreate', { state: { latLong: latLong } });
    }
  }
  
    return (
        <Container style={{ width: '1500px', height: '100%' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%'}}>
                <div style={{ flex: '1' }}>
                    <h3>Find your place</h3>
                    <div ref={mapRef} style={{ height: '700px', width: '100%' }}></div> {/* Use the ref here */}
                    <Button onClick={handleAddPin} className = "btn addpinButton mt-3">Add a pin</Button>
                </div>
                <div style={{ flex: '1', height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                    <Button className='feedButton  btn-lg' variant="primary" onClick={() => handleButtonClick('Button 1')}>Feed</Button>
                    <Button className='mypinsButton btn-lg' variant="secondary" onClick={() => handleButtonClick('Button 2')}>My Pins</Button>
                    <Button className='favsButton btn-lg' variant="secondary" onClick={() => handleButtonClick('Button 3')}>Favorites</Button>
                    </div>
                    <div id="feedwindow" className='contentwindow' style={{ display: content === 'Button 1' ? 'block' : 'none', overflow: 'auto', width: '100%', height: '750px'}}>
                        <PinListPage onCardClick={handleCardClick}/>
                    </div>
                    <div id="favwindow" className='contentwindow2' style={{ display: content === 'Button 2' ? 'block' : 'none', overflow: 'auto', width: '100%', height: '750px' }}>
                        <MyPinListPage onCardClick={handleCardClick}/>
                    </div>
                    <div id="favoriteswindow" className='contentwindow3' style={{ display: content === 'Button 3' ? 'block' : 'none', overflow: 'auto', width: '100%', height: '750px' }}>
                        <FavoriteListPage onCardClick={handleCardClick}/>
                    </div>

                    <div>
                    <h1>Here you can login</h1>
                    <button onClick={navigateToLogin}>Login</button>
                    </div>


                    </div>
                </div>
            <div className='footer'>
            <p className='text-center'><strong>Sub-application 2</strong></p>
            </div>
        </Container>
    );
};

export default PinTable;