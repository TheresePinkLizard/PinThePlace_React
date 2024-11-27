import React, {useState, useEffect} from 'react';
import { Card, Container, Row, Col, Table, Button } from 'react-bootstrap';

const API_URL = 'http://localhost:5056'

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true); // Set loading to true when starting the fetch
        setError(null);   // Clear any previous errors
        try {
            const response = await fetch(`${API_URL}/api/userapi/userlist`); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
            console.log(data);
        } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch users.');
        } finally {
            setLoading(false); // Set loading to false once the fetch is complete
        }
    };  
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Container>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Pins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.UserId}>
                                <td>{user.UserId}</td>
                                <td>{user.UserName}</td>
                                <td>{user.Email}</td>
                                <td>{user.Pins && user.Pins.map(pin => `Pin${pin.PinId}`).join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default UserListPage;