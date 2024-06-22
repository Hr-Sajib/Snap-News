import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { fetchNews, fetchPublishers, fetchUsers } from '../../functions';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Aos from "aos";
import 'aos/dist/aos.css'

const Image_Hosting_key = import.meta.env.VITE_Image_Hosting_key;
const Image_Hosting_API = `https://api.imgbb.com/1/upload?key=${Image_Hosting_key}`;

const AddArticle = () => {
  const [publishers, setPublishers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['fetchPublishers'],
    queryFn: fetchPublishers,
  });

  useEffect(() => {
    if (data) {
      setPublishers(data);
    }
  }, [data]);

  const [allNews, setAllNews] = useState([]);
  const { data: newsData, isLoading: isNewsLoading } = useQuery({
    queryKey: ['fetchNews'],
    queryFn: fetchNews,
    });

    useEffect(() => {
        if (newsData) {
            setAllNews(newsData);
        }
    }, [newsData]);

  const [allUsers, setAllUsers] = useState([]);
  useEffect(()=>{
    axios.get('https://snapnews-server.vercel.app/getUsers')
    .then(d=>{
        setAllUsers(d.data);
        })
    }, [])

  const [articleInfo, setArticleInfo] = useState({
    title: '',
    image: null, 
    publisher: '',
    tags: [],
    description: '',
    premium: '',
    approval: 'no',
    views: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleInfo({ ...articleInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setArticleInfo({ ...articleInfo, image: file });
  };

  const handleTagChange = (selectedOptions) => {
    const tags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setArticleInfo({ ...articleInfo, tags });
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const d = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = d.toLocaleDateString('en-US', options);

    setArticleInfo({
      ...articleInfo,
      date: date,
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the user has already posted an article

    const userArticles = allNews.filter(article => article.authorEmail === user.email);
    const currentUser = allUsers.find(u => u.userEmail === user.email);

    if (userArticles.length >= 1 && !currentUser.premiumToken) {
     
      Swal.fire({
        title: 'Post Limit Ended',
        text: 'You have already posted an article. Upgrade to premium to post more articles.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setLoading(false);
      return;
    }

    // Upload image to ImgBB and get the URL
    const formData = new FormData();
    formData.append('image', articleInfo.image);

    try {
      const response = await axios.post(Image_Hosting_API, formData);
      const image = response.data.data.url;
      const articleData = { ...articleInfo, image: image };
      console.log(articleData);

      // Send article data to server
      const articleResponse = await axios.post('https://snapnews-server.vercel.app/addArticles', articleData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Article Info:', articleResponse.data);

      Swal.fire({
        title: 'Success!',
        text: 'Your Article Posted Successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Reset form state
        setArticleInfo({
          title: '',
          image: null, 
          publisher: '',
          tags: [],
          description: '',
          premium: '',
          approval: 'no',
          views: 0,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          authorName: user.displayName,
          authorEmail: user.email,
          authorImage: user.photoURL,
        });
      
        // Clear the file input manually
        document.querySelector('input[type="file"]').value = null;
      });
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    Aos.init();
  },[])
  


  return (
    <div data-aos="fade-up" className="max-w-4xl mx-auto mt-10 p-6 bg-blue-50 rounded-lg">
            <Helmet>
                 <title>SnapNews Add Article</title>
            </Helmet>
      <h2 className="text-xl font-semibold mb-4">Add New Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={articleInfo.title}
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
            required
          />
        </div>

        <div className="mb-4">
          <select
            name="publisher"
            value={articleInfo.publisher}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Publisher</option>
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
            value={articleInfo.premium}
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
            value={articleInfo.tags.map(tag => ({ value: tag, label: tag }))}
            onChange={handleTagChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Description:</label>
          <textarea
            name="description"
            value={articleInfo.description}
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
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
