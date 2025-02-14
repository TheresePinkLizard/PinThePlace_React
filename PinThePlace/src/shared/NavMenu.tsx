import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import '../style.css';


const NavMenu: React.FC = () => {

    const [username, setUsername] = useState<string | null>(null);
    
    const updateUsername = () => {
        const storedUsername = sessionStorage.getItem('username');
        setUsername(storedUsername);
    };
    
    useEffect(() => {
              // Get the username the first time it renders
              updateUsername();

              // Adding a listener for changes in sessionStorage 
              const handleStorageChange = (event: StorageEvent) => {
                  if (event.key === 'username') {
                      updateUsername();
                  }
              };
      
              window.addEventListener('storage', handleStorageChange);
      
             
              return () => {
                  window.removeEventListener('storage', handleStorageChange);
              };
      }, []);

    return (
        <Navbar expand="lg" className='header'>
            <Navbar.Brand href="/Table">
                <img
                    src="/images/header.png"  
                    width="auto"
                    height="180"
                    className="d-inline-block align-top"
                    alt="Pin The Place logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/Table">Home</Nav.Link>
                    <Nav.Link href="/pins">Pins</Nav.Link>
                    {username === 'Admin' && <Nav.Link href="/users">Users</Nav.Link>} {/* Only for admin */}
                    <Nav.Link href="/HomePage">About</Nav.Link>
                    {!username && <Nav.Link href="/login">Login</Nav.Link>}
                    {username && <Nav.Link href="/logout">Logout</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default NavMenu;