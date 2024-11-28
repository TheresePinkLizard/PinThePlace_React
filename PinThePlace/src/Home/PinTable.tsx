import React, { useState, useEffect, useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import PinListPage from '../pins/PinListPage';
import UserListPage from '../pins/UserListPage';
import '../style.css';

const PinTable: React.FC = () => {
    const [content, setContent] = useState('Button 1');
    const mapRef = useRef(null);

    const handleButtonClick = (buttonName) => {
        setContent(buttonName);
    };

    useEffect(() => {
        if (!mapRef.current) {
            return;
        }
/*
        const L = window.L;
        const map = L.map(mapRef.current).setView([59.9139,10.7522],13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map);

         //Adding the map 
        var map = L.map('map').setView([59.9139,10.7522],13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map);

        const provider = new GeoSearch.OpenStreetMapProvider();

        const searchControl = new GeoSearch.GeoSearchControl({
        provider: provider,
        showMarker: true,
        showPopup: false,
        marker: {
            icon: new L.Icon.Default(),
            draggable: false,
        },
        popupFormat: ({ query, result }) => result.label,
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: true,
        searchLabel: 'Enter address',
        keepResult: true
        });

        map.addControl(searchControl);



        //Makes a pop up that shows the clicked places' latitude and longitude 
        var currentMarker = null;


        function onMapClick(e) {
            var lat = e.latlng.lat.toFixed(6);
            var long = e.latlng.lng.toFixed(6);

            if (currentMarker){
                map.removeLayer(currentMarker);
            }
            currentMarker = L.marker(e.latlng).addTo(map);
        
            
            sessionStorage.setItem('Lat',lat);
            sessionStorage.setItem('Long',long);

            //document.getElementById("latitude").value = lat;
        // document.getElementById("Longitude").value = long;
        }
        map.on('click',onMapClick);

        map.on('geosearch/showlocation', function(e) {
            if (e.location){
                var lat = e.location.y;
                var long = e.location.x;

                if (currentMarker){
                    map.removeLayer(currentMarker);
                }
                currentMarker = L.marker([lat,long]).addTo(map);
        
                sessionStorage.setItem('Lat',lat);
                sessionStorage.setItem('Long',long);

                console.log('GeoSearch location:', lat, long);
                console.log('sessionStorage after GeoSearch:', sessionStorage);
            } else {
                console.error("location null");
            }
        });

        document.getElementById('add_a_pin').addEventListener('click', function(e) {
        var lat = sessionStorage.getItem('Lat');
        var long = sessionStorage.getItem('Long');

        if (!lat || !long) {
            e.preventDefault();
            alert('Please click on the map first before trying to add a pin!.');
        }
    }); */
    }, []);
   

    return (
        <Container style={{ width: '1500px', height: '1000px' }}>
            <div style={{ display: 'flex', width: '100%', height: 'auto' }}>
                <div style={{ flex: '0 0 50%' }}>
                    <h3>Find your place</h3>
                    <div id="map" style={{ height: '500px', width: '100%' }}></div>
                    <Button href='pincreate' className = "btn addpinButton mt-3">Add a pin</Button>
                </div>
                <div style={{ flex: '1' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button className='feedButton btn-lg btn' variant="primary" onClick={() => handleButtonClick('Button 1')}>Feed</Button>
                        <Button className='mypinsButton btn-lg btn' variant="secondary" onClick={() => handleButtonClick('Button 2')}>My Pins</Button>
                    </div>
                    <div id="feedwindow" className='contentwindow' style={{ display: content === 'Button 1' ? 'block' : 'none', overflow: 'auto', width: '500px', height: '550px'}}>
                        <PinListPage />
                    </div>
                    <div id="favwindow" className='contentwindow'style={{ display: content === 'Button 2' ? 'block' : 'none', overflow: 'auto', width: '500px', height: '550px' }}>
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