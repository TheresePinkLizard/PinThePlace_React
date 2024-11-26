import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
        <div class="text-center">
            <h1 class="display-4">Welcome to PinThePlace!</h1>
            <p>In this application you are able to save your favorite locations by pinning the place!</p>
            <p>Creating a pin is easy! Just click on the map, press the button "Add a pin" to fill out information. You can even upload your own photos! </p>
            <p>In the feed you can see all the places other users have pinned! Maybe you get an idea of a new places to check out?</p>
            <p>You can also edit or delete your pins in the "My Pins" view</p>
            <p>The feed is open to everyone but if you want to pin your own places you have to register or login</p>
            <p>We hope you have fun pinning places!</p>
        
            <Link to="/table">
                <button>Go to Table</button>
            </Link>
        </div>
        
    );
   
};

export default HomePage;