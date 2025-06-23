import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import ResultPage from './pages/ResultPage';
import UserProfile from './pages/UserProfile';
import AdminLanding from './pages/AdminLanding';
import AdminEntry from './pages/AdminEntry';
import AdminWork from './pages/AdminWork';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminLanding />} />
        <Route path="/verify" element={< AdminEntry/>} />
        <Route path="/list" element={< AdminWork/>} />




        
      </Routes>
    </Router>
  );
}

export default App;


