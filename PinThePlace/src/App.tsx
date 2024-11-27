import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import HomePage from './Home/HomePage';
import PinListPage from './pins/PinListPage';
import NavMenu from './shared/NavMenu';
import Table from './Home/PinTable';

// Code to call homepage: <HomePage/>
const App: React.FC = () => {
  return (
   <Container>
    <NavMenu />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pins" element={<PinListPage />} />
            <Route path="/table" element={<Table />} /> 
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
    </Container>
  );
};

export default App;
