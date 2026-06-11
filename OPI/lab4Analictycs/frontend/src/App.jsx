import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/authSlice';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (status === 'loading' || status === 'idle') {
    return <div>Loading...</div>; // Or spinner
  }

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="container">
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
