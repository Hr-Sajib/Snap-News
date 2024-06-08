import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Select from 'react-select';
import { fetchPublishers } from '../../functions';
import { AuthContext } from '../AuthProvider/AuthProvider';

const AddArticle = () => {
  const [publishers, setPublishers] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['fetchPublishers'],
    queryFn: fetchPublishers,
  });

  useEffect(() => {
    if (data) {
      setPublishers(data);
    }
  }, [data]);






  const [articleInfo, setArticleInfo] = useState({
    title: '',
    image: '',
    publisher: '',
    tags: [],
    description: '',
    premium: '',
    approval: 'no'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleInfo({ ...articleInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setArticleInfo({ ...articleInfo, image: value });
  };

  const handleTagChange = (selectedOptions) => {
    const tags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setArticleInfo({ ...articleInfo, tags });
  };



  // add user info and current date
  const {user} = useContext(AuthContext);

  useEffect(()=>{

    const d = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = d.toLocaleDateString('en-US', options);

    setArticleInfo({ ...articleInfo, date: date , authorName: user.displayName, authorEmail: user.email, authorImage: user.photoURL});

  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Article Info:", articleInfo);


    // send data to server
    fetch('http://localhost:5500/addArticles', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleInfo)
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data);
    })
    .catch(error => console.error('Error:', error));
  };



// console.log(user);


  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-blue-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Title:</label>
          <input type="text" name="title" value={articleInfo.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Image Url:</label>
          <input type="text" name="image" value={articleInfo.image} onChange={handleImageChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent" required />
        </div>

        <div className="mb-4">
          <select name="publisher" value={articleInfo.publisher} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent" required>
            <option value="">Select Publisher</option>
            {
              publishers.map((p, index) => <option key={index} value={p.name}>{p.name}</option>)
            }
          </select>
        </div>
        <div className="mb-4">
          <select name="premium" value={articleInfo.premium} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent" required>
            <option value="">Select Premium or Not</option>
            <option value="yes">Premium</option>
            <option value="no">Not Premium</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Tags:</label>
          <Select
            isMulti
            name="tags"
            options={[
              { value: 'technology', label: 'technology' },
              { value: 'smartphone', label: 'smartphone' },
              { value: 'stocks', label: 'stocks' },
              { value: 'entertainment', label: 'entertainment' },
              { value: 'music', label: 'music' },
              { value: 'stock market', label: 'stock market' },
              { value: 'economic', label: 'economic' },
              { value: 'health', label: 'health' },
              { value: 'nutrition', label: 'nutrition' },
              { value: 'NASA', label: 'NASA' },
              { value: 'space mission', label: 'space mission' },
              { value: 'climate', label: 'climate' },
              { value: 'United Nations', label: 'United Nations' },
              { value: 'world', label: 'world' },
            ]}
            value={articleInfo.tags.map(tag => ({ value: tag, label: tag }))}
            onChange={handleTagChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Description:</label>
          <textarea name="description" value={articleInfo.description} onChange={handleInputChange} className="w-full h-[200px] px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 border-transparent" required></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">Submit</button>
      </form>
    </div>
  );
};

export default AddArticle;
