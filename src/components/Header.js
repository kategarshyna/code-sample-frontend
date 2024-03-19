import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

export function Header() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="bg-indigo-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Test App
                </Link>
                <nav>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="mx-4 hover:underline">
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="mx-4 cursor-pointer">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mx-4 hover:underline">
                                Sign In
                            </Link>
                            <Link to="/register" className="mx-4 hover:underline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

