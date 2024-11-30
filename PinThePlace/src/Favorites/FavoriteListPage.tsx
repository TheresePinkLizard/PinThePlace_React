import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Card, Container, Row, Col, Table, Button, Form} from 'react-bootstrap';
import {Favorite} from '../types/favorite';
import PinTable from '../Home/PinTable';
import API_URL from '../apiConfig';
import { useLocation } from 'react-router-dom';

import * as PinService from '../pins/PinService';
import * as FavoriteService from '../Favorites/FavoriteService';

type FavoriteListPageProps = {
    onCardClick: (lat: number, long: number, pinId: number) => void;
    selectedCard: any;
    setSelectedCard: React.Dispatch<React.SetStateAction<any>>;
  };

  const FavoriteListPage: React.FC<FavoriteListPageProps> = ({ onCardClick,  selectedCard, setSelectedCard }) => {

        const username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');

        const [favorites, setFavs] = useState<Favorite[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);
        const [searchQuery, setSearchQuery] = useState('');

        // imported to store latitude and longitude
        const location = useLocation();
        const { latLong } = location.state || { latLong: { lat: 0, long: 0 } }; 

        const fetchFavorites = async () => {
            if(!username) return;
            setLoading(true); // Set loading to true when starting the fetch
            setError(null);   // Clear any previous errors
        try {
            const data = await FavoriteService.fetchFavorites();
            const userFavorites = data.filter((favorite: Favorite) => favorite.userId === userId);  
            setFavs(userFavorites);
            console.log(userFavorites);
            } catch (error) {
            console.error(`There was a problem with the fetch operation: ${error.message}`);
            setError('Failed to fetch pins.');
            } finally {
            setLoading(false); // Set loading to false once the fetch is complete
            }
        };  
        useEffect(() => {
            fetchFavorites();
        }, []);

        const handleFavoriteDeleted = async(FavoriteId: number) => {
            const confirmDelete = window.confirm(`Are you sure you want to delete the Favorite ${FavoriteId}?`);
            if (confirmDelete) {
              try {
                await FavoriteService.deleteFavorite(FavoriteId);
                setFavs(prevFavorites => prevFavorites.filter(favorite =>favorite.favoriteId !== FavoriteId));
                console.log('Favorite deleted:', FavoriteId);
              } catch (error) {
                console.error('Error deleting favorite:', error);
                setError('Failed to delete favorite.');
              }
            }
          }; 
        
        

        const filteredFavorites = searchQuery
        ? favorites.filter(favorite =>
            favorite.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : favorites;

        if (!username) {
            return (
                <Container>
                    <p>Please log in to view your favorite pins.</p>
                    </Container>
                );
            }


    return (
        <Container>
            {username && <div>Logged in as: {username}</div>}
             <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search favorite by category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && filteredFavorites.length === 0 && <p>No favorites match your search criteria.</p>}
        <Row>
            {filteredFavorites.map(favorite => (
                <Col xs={12} key={favorite.favoriteId} className="mb-4">
                    <Card style={{ marginBottom: '20px',backgroundColor: favorite.pin.pinId === selectedCard ? 'white' : 'initial' }} onClick={() => {onCardClick(favorite.pin.latitude, favorite.pin.longitude, favorite.pin.pinId);setSelectedCard(favorite.pin.pinId);}}>
                        <Row className="no-gutters">
                            <Col md={6}>
                                <Card.Body>
                                    <Card.Title><strong>{favorite.pin.name}</strong></Card.Title>
                                    <Card.Text><strong>Rating: </strong>{favorite.pin.rating}</Card.Text>
                                    <Card.Text><strong>Category:</strong> {favorite.category}</Card.Text>
                                    <Card.Text><strong>Date: </strong>
                                        {
                                            new Date(favorite.pin.dateCreated).toISOString().split('.')[0].replace('T', ' ')
                                        }
                                    </Card.Text>
                                    <Card.Text><strong>Comment: </strong>{favorite.pin.comment}</Card.Text>
                                    <Card.Text><strong>UserName: </strong>{favorite.pin.userName}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/favoriteupdate/${favorite.favoriteId}`} className="btn btn-primary">
                                                Update
                                        </Link>
                                        <Button variant="danger" onClick={() => handleFavoriteDeleted(favorite.favoriteId)}>Delete</Button>
                                    </div>
                                </Card.Body>
                            </Col>
                            <Col md={6}>
                                <div className="image-container">
                                    {favorite.pin.imageUrl && <Card.Img variant="top" className="image-card" src={`${API_URL}${favorite.pin.imageUrl}`} alt={favorite.pin.name}/>}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
    );
};

export default FavoriteListPage;
