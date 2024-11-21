import React from 'react';
import { Table } from 'react-bootstrap';

const PinListPage= () => {
    // Mock data
    const pins = [
    {
        PinId: 1,
        Name: "Slottet",
        Rating: 4,
        Comment: "Kjempe fin arkitektur og park. Anbefales!",
        Latitude: 59.91731919136782,
        Longitude: 10.727738688356991,
        UserName: "user1",
        UserId: 1,
        ImageUrl: "/images/cat.jpg"
    },
    {
        PinId: 2,
        Name: "OsloMet",
        Rating: 5,
        Comment: "Bra skole. Anbefales!",
        Latitude: 59.921365321156706, 
        Longitude: 10.733315263484577,
        UserName: "user2",
        UserId: 2,
        ImageUrl: "/images/lynx.jpg"
    },
    {
        PinId: 3,
        Name: "Admin",
        Rating: 5,
        Comment: "Dette er en Admin pin!",
        Latitude: 59.921365321156706, 
        Longitude: 10.733315263484577,
        UserName: "admin",
        UserId: 3,
        ImageUrl: "/images/tiger.jpg"
    }
    ];
    return (
        <div>
            <h1>Pins</h1>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>PinId</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>UserName</th>
                    <th>UserId</th>
                    <th>ImageUrl</th>
                </tr>
            </thead>
            <tbody>
                {pins.map(pin => (
                    <tr key={pin.PinId}>
                        <td>{pin.PinId}</td>
                        <td>{pin.Name}</td>
                        <td>{pin.Rating}</td>
                        <td>{pin.Comment}</td>
                        <td>{pin.Latitude}</td>
                        <td>{pin.Longitude}</td>
                        <td>{pin.UserName}</td>
                        <td>{pin.UserId}</td>
                        <td><img src={pin.ImageUrl} alt={pin.Name} width="120" /></td> 
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
export default PinListPage;