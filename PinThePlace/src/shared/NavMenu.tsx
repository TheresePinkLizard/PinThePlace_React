import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../style.css';

const NavMenu: React.FC = () => {
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
                    <Nav.Link href="/pins/">Pins</Nav.Link>
                    <Nav.Link href="/HomePage">About</Nav.Link>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default NavMenu;