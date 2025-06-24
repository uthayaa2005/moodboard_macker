import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BoardPage from './pages/BoardPage';
import Navbar from './components/Navbar'; 
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    
    <Router>
      <Navbar />
      <div >
        <Routes>
         <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      <Route
          path="/boards"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </Router>
  
  );
}

export default App;
