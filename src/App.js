import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Register from './components/Register';

import { loginSuccess } from './redux/authSlice';

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const userIsLoggedIn = localStorage.getItem('jwtToken');

        if (userIsLoggedIn) {
            dispatch(loginSuccess());
        }
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
                <Route path="/login" element={isLoggedIn ? <Navigate to="/profile" /> : <Login />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/profile" /> : <Register />} />
                <Route path="/profile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
