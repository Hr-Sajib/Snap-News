import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Image_Hosting_key = import.meta.env.VITE_Image_Hosting_key;
const Image_Hosting_API = `https://api.imgbb.com/1/upload?key=${Image_Hosting_key}`;

const AddPublisher = () => {
    const [publisherInfo, setPublisherInfo] = useState({
        name: '',
        logo: null
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPublisherInfo({ ...publisherInfo, [name]: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setPublisherInfo({ ...publisherInfo, logo: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('image', publisherInfo.logo);

        axios.post(Image_Hosting_API, formData)
            .then(res => {
                const logoUrl = res.data.data.url;
                const publisher = { ...publisherInfo, 'logo': logoUrl };

                // Send data to server
                fetch('https://snapnews-server.vercel.app/addPublisher', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(publisher)
                })
                .then(res => res.json())
                .then(data => {
                    Swal.fire({
                        title: "Publisher Added!",
                        icon: "success"
                    });
                    // Reset form fields
                    setPublisherInfo({
                        name: '',
                        logo: null
                    });
                    // Clear file input value
                    document.getElementById('logo-input').value = '';
                })
                .catch(err => {
                    console.error('Error adding publisher:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                setLoading(false);
            });
    };

    return (
        <div className="max-w-4xl lg:ml-[160px] mt-10 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Publisher</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Publisher Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={publisherInfo.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Publisher Logo:</label>
                    <input
                        type="file"
                        id="logo-input"
                        name="logo"
                        onChange={handleLogoChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-5 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddPublisher;
