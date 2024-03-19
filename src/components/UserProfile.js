import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {API_BASE_URL} from "../constants";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                if (!response.ok) {
                    console.error('Failed to fetch user profile:', response.status);
                    return;
                }

                const profileData = await response.json();
                setUserData(profileData);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        };

        fetchUserProfile();
    }, [jwtToken]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="text-center text-gray-600 max-w-screen-md mx-auto bg-white p-8 shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6">User Profile</h2>
            {userData && (
                <div>
                    <img
                        src={userData.avatar.url || 'default_avatar_url'}
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <p className="text-lg font-semibold">{userData.fullName}</p>
                    <p className="text-gray-600">{userData.email}</p>

                    {userData.photos && userData.photos.length > 0 && (
                        <div className="mt-6">
                            <p className="font-semibold">Photos:</p>
                            <Slider {...settings}>
                                {userData.photos.map((photo, index) => (
                                    <div key={index} className="text-center">
                                        <img src={photo.url} alt={`Photo ${index + 1}`} className="mx-auto" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
