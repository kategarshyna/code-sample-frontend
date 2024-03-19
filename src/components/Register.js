import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_BASE_URL } from '../constants';

const Register = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [success, setSuccess] = useState(null);

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            if (data.avatar.length > 0) {
                formData.append('avatar', data.avatar[0]);
            }

            if (data.photos.length > 0) {
                Object.values(data.photos).forEach((photo) => formData.append('photos[]', photo));
            }

            const response = await fetch(`${API_BASE_URL}/api/users/register`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();

                Object.keys(errorData.errors).forEach((field) => {
                    setError(field, { type: 'manual', message: errorData.errors[field] });
                });

                return;
            }

            setSuccess(true);
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError('password', { type: 'manual', message: 'Registration failed. Please try again.' });
        }
    };

    return (
        <div className="text-gray-600 min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto bg-white p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            {success ? (
                <div className="text-green-500">
                    Registration successful!
                    You can now <a href="/login" className="text-blue-500 hover:underline">login</a>.
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name:</label>
                        <input
                            type="text"
                            {...register('firstName')}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            {...register('lastName')}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="text"
                            {...register('email')}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            {...register('password')}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Avatar:</label>
                        <input
                            type="file"
                            {...register('avatar')}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.avatar ? 'border-red-500' : ''}`}
                        />
                        {errors.avatar && <div className="text-red-500 text-xs mt-1">{errors.avatar.message}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photos:</label>
                        <input
                            type="file"
                            {...register('photos')}
                            multiple
                            className={`mt-1 p-2 w-full border rounded-md ${errors.photos ? 'border-red-500' : ''}`}
                        />
                        {errors.photos && <div className="text-red-500 text-xs mt-1">{errors.photos.message}</div>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
                    >
                        Register
                    </button>
                </form>
            )}
        </div>
        </div>
    );
};

export default Register;
