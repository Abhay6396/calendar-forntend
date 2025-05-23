import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage';
import SchoolHome from './components/SchoolHome';
import ProtectedRoute from './auth/auth';
import RegisterPage from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/school/:schoolId" element={<SchoolHome />} />
        {/* <Route path="/register" element={<RegisterPage />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
