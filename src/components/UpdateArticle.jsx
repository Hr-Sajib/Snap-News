import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { AuthContext } from './AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { fetchPublishers } from '../functions';
import Aos from "aos";
import 'aos/dist/aos.css'

const Image_Hosting_key = import.meta.env.VITE_Image_Hosting_key;
const Image_Hosting_API = `https://api.imgbb.com/1/upload?key=${Image_Hosting_key}`;

const UpdateArticle = () => {
  const [article, setArticle] = useState(null);


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

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://snapnews-server.vercel.app/getArticle/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setArticle({ ...article, image: file });
  };

  const handleTagChange = (selectedOptions) => {
    const tags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setArticle({ ...article, tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = article.image;

    if (typeof article.image === 'object') {  // If a new image file is selected
      const formData = new FormData();
      formData.append('image', article.image);

      try {
        const response = await axios.post(Image_Hosting_API, formData);
        imageUrl = response.data.data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
        return;
      }
    }

    const updatedArticle = { ...article, image: imageUrl };

    try {
      await axios.put(`https://snapnews-server.vercel.app/updateArticle/${id}`, updatedArticle, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Article Updated Successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error updating article:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    Aos.init();
  },[])

  return (
    <div data-aos="zoom-in" className="max-w-4xl mx-auto mt-10 p-6 bg-blue-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Article</h2>
      {article && (
        <form data-aos="fade-down" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={article.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <select
              name="publisher"
              value={article.publisher}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Publisher</option>
              {/* Assuming you have a publishers list from somewhere */}
              {publishers.map((p, index) => (
                <option key={index} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              name="premium"
              value={article.premium}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
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
              value={article.tags.map(tag => ({ value: tag, label: tag }))}
              onChange={handleTagChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Description:</label>
            <textarea
              name="description"
              value={article.description}
              onChange={handleInputChange}
              className="w-full h-[200px] px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateArticle;
