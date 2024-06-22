import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const MyProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactEmail: '',
        age: '',
        address: '',
        language: 'english',
        favoriteCategories: []
    });

    const [loading, setLoading] = useState(false);
    const [premium, setPremium] = useState(null);

    const { user } = useContext(AuthContext);
    const email = user?.email;

    useEffect(() => {
        if (email) {
            axios.get(`https://snapnews-server.vercel.app/getUser/${email}`)
                .then(response => {
                    const data = response.data;
                    setFormData({
                        name: data.name || '',
                        contactEmail: data.contactEmail || '',
                        age: data.age || '',
                        address: data.address || '',
                        language: data.language || 'english',
                        favoriteCategories: data.favoriteCategories || []
                    });
                    setPremium(data.premiumToken);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [email]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => {
                const updatedCategories = checked
                    ? [...prevData.favoriteCategories, value]
                    : prevData.favoriteCategories.filter(category => category !== value);
                return { ...prevData, favoriteCategories: updatedCategories };
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formInputData = { ...formData };

        axios.put(`https://snapnews-server.vercel.app/updateUserInfo/${email}`, formInputData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating your profile. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <Helmet>
                 <title>SnapNews My Profile</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>

            <div className='my-5 text-blue-500'>
                <p>You can provide additional information through this form to be saved in the Database User Information</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">Contact Email</label>
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium mb-2">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="language" className="block text-sm font-medium mb-2">Language</label>
                    <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="subscriptionStatus" className="block text-sm font-medium mb-2">Subscription Status</label>
                    <div className='flex gap-2 items-center'>
                        {premium ? (
                            <p className='bg-blue-400 p-2 text-white rounded-lg w-36 text-center'>Premium Mode</p>
                        ) : (
                            <p className='bg-gray-400 p-2 text-gray-200 rounded-lg w-36 text-center'>On Free Mode</p>
                        )}
                        <Link to='/subscription' className='bg-green-200 p-2 text-gray-700 rounded-lg w-[200px] text-center'>Take New Subscription</Link>
                    </div>
                </div>

                <div className="mb-4 border border-gray-400 p-5 rounded-xl">
                    <label className="block text-sm font-medium mb-2">Favorite News Categories</label>
                    <div className="flex flex-wrap">
                        {['world', 'politics', 'business', 'technology', 'science', 'health', 'sports', 'entertainment'].map(category => (
                            <div key={category} className="mr-4 mb-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="favoriteCategories"
                                        value={category}
                                        checked={formData.favoriteCategories.includes(category)}
                                        onChange={handleChange}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="ml-2 text-sm">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-5 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Save & Update'}
                </button>
            </form>
        </div>
    );
};

export default MyProfile;
