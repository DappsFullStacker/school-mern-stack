import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ScoreboardPage from './pages/ScoreboardPage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';
import UserPage from './pages/UserPage';
import NotFoundPage from './pages/NotFoundPage';
import isAuthenticated from './utils/auth';
import api from './utils/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated()) {
        try {
          const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const data = res.data;
          console.log('Server response:', data);
          if (data.user && data.user._id) {
            const role = data.role || localStorage.getItem('role');
            setUser({ ...data, role });
          } else {
            console.error('Server response is missing user ID');
            setUser(null);
          }
        } catch (err) {
          console.error(err);
          setUser(null);
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
      }
  
      setIsLoading(false);
    };
  
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    return <Navigate to="/" />;
  };

  if (isLoading) {
    return <div><Loading /></div>; 
  }

  return (
    <Router>
      <Navigation user={user} logout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/" />} />
          {user && user.role && (user.role === "teacher" || user.role === "admin" || user.role === "principal") ? (
            <Route path="/scoreboard" element={<ScoreboardPage />} />
          ) : null}
          {user && user.role && (user.role === "teacher" || user.role === "admin" || user.role === "principal") ? (
            <Route path="/students" element={<StudentPage />} />
          ) : null}
          {user && user.role && (user.role === "admin" || user.role === "principal") ? (
            <Route path="/teachers" element={<TeacherPage />} />
          ) : null}
          <Route path="/users" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;