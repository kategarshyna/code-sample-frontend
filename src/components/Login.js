import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginSuccess } from '../redux/authSlice';
import {API_BASE_URL} from "../constants";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email, password: data.password }),
            });

            if (!response.ok) {
                const errorData = await response.json();

                Object.keys(errorData.errors).forEach((field) => {
                    setError(field, { type: 'manual', message: errorData.errors[field] });
                });

                return;
            }

            const { token } = await response.json();

            localStorage.setItem('jwtToken', token);

            dispatch(loginSuccess());

            navigate('/profile');
        } catch (error) {
            console.error('Login failed:', error.message);
            setError('password', { type: 'manual', message: 'Login failed. Please try again.' });
        }
    };

    return (
        <div className="text-gray-600 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="p-20">
                    Sign In or <a href="/register" className="text-blue-500 hover:underline">create a new account</a>
                </p>
                <div className="max-w-md mx-auto bg-white p-8 shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="text-left">
                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="text"
                                {...register('email')}
                                className={`mt-1 p-2 w-full border rounded-md ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.email && (
                                <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>
                            )}
                        </div>

                        <div className="text-left">
                            <label className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                {...register('password')}
                                className={`mt-1 p-2 w-full border rounded-md ${
                                    errors.password ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.password && (
                                <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
