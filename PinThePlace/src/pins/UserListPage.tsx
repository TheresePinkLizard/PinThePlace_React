import React, {useState, useEffect} from 'react';
import { Card, Container, Row, Col, Table, Button } from 'react-bootstrap';
import {User} from '../types/user';
import {Pin} from '../types/pin';

import API_URL from '../apiConfig';

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const username = sessionStorage.getItem('username');

    const fetchUsers = async () => {
        if( username !== "Admin") return;
        setLoading(true); // Set loading to true when starting the fetch
        setError(null);   // Clear any previous errors
        try {
            const response = await fetch(`${API_URL}/api/userapi/userlist`); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: User[] = await response.json();
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
                            <th>Username</th>
                            <th>Email</th>
                            <th>Pins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userName}>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.pins && user.pins.map(pin => `Pin${pin.pinId}`).join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default UserListPage;