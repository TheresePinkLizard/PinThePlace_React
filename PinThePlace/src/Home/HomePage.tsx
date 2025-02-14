import React from 'react';
import { Link } from 'react-router-dom';


import API_URL from '../apiConfig';

const HomePage: React.FC = () => {
    

    return (
        <div className='text-center'>
            <h1>Welcome to PinThePlace!</h1>
            <p>In this application you are able to save your favorite locations by pinning the place!</p>
            <p>Creating a pin is easy! Just click on the map, press the button "Add a pin" to fill out information. You can even upload your own photos! </p>
            <p>In the feed you can see all the places other users have pinned! Maybe you get an idea of a new places to check out?</p>
            <p>If something really stands out to you, you can favorite other peoples pins and add a Category to it!</p>
            <p>You can also edit or delete your pins in the "My Pins" view</p>
            <p>The feed is open to everyone but if you want to pin your own places you have to register or login</p>
            <p>We hope you have fun pinning places!</p>
        
            <Link to="/table">
                <button>Start pinning places!</button>
            </Link>
        </div>
        
    );
   
};

export default HomePage;