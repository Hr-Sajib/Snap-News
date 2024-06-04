import React, { useState } from 'react';

const AddPublisher = () => {
    const [publisherInfo, setPublisherInfo] = useState({
        name: '',
        logo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPublisherInfo({ ...publisherInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Publisher Info:", publisherInfo);

        // send data to server
        fetch('http://localhost:5500/addPublisher', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publisherInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error('Error adding publisher:', err);
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
                    <label className="block text-sm font-semibold mb-2">Publisher Logo URL:</label>
                    <input 
                        type="text" 
                        name="logo" 
                        value={publisherInfo.logo} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent" 
                        required 
                    />
                </div>

                <button type="submit" className="w-full mt-5 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">Submit</button>
            </form>
        </div>
    );
};

export default AddPublisher;
