import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews, fetchPublishers } from '../functions';
import { PiStarFill } from "react-icons/pi";
import axios from 'axios';
import { AuthContext } from './AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Aos from "aos";
import 'aos/dist/aos.css'


const Allnewsicles = () => {
    // Load news
    const [allNews, setAllNews] = useState([]);
    const [showNews, setShowNews] = useState([]);

    const { data: newsData, isLoading: isNewsLoading } = useQuery({
        queryKey: ['fetchNews'],
        queryFn: fetchNews,
    });

    useEffect(() => {
        if (newsData) {
            const approvedNews = newsData.filter(n => n.approval[0] == 'a')
            setAllNews(approvedNews);
        }
    }, [newsData]);

    // Update showNews whenever allNews is updated
    useEffect(() => {
        setShowNews(allNews);
    }, [allNews]);

    // Load publishers for filter
    const [allPublishers, setAllPublishers] = useState([]);

    const { data: publishersData, isLoading: isPublishersLoading } = useQuery({
        queryKey: ['fetchPublishers'],
        queryFn: fetchPublishers,
    });

    useEffect(() => {
        if (publishersData) {
            setAllPublishers(publishersData);
        }
    }, [publishersData]);

    const handleFilter = (e) => {
        e.preventDefault();
        
        const targetPub = e.target.publisher.value;
        const targetTag = e.target.tag.value;
    
        let filteredNews = allNews;
    
        if (targetPub) {
            filteredNews = filteredNews.filter(n => n.publisher === targetPub);
        }
    
        if (targetTag) {
            filteredNews = filteredNews.filter(n => n.tags.includes(targetTag));
        }
    
        setShowNews(filteredNews);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const searchText = e.target.searchText.value;

        // server call
        axios.get(`https://snapnews-server.vercel.app/getSearchedArticles/${searchText}`)
        .then(res => {
            setShowNews(res.data);
        })
        .catch(error => {
            console.error("Error fetching searched articles:", error);
        });
    };

    // Handle premium or not 
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const [savedUser, setSavedUser] = useState(null);

    useEffect(() => {
        if (email) {
            axios.get(`https://snapnews-server.vercel.app/getUser/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                },
            })
            .then(data => {
                setSavedUser(data.data);
                
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, [email]);

    if (isNewsLoading || isPublishersLoading) {
        return <div className='text-center'>Loading...</div>;
    }





    return (
        showNews.length > 0 ? (
            <div >
                <Helmet>
                 <title>SnapNews All Articles</title>
                </Helmet>
                <div className='h-20 lg:mx-24 mx-1 rounded-xl lg:flex items-center justify-between'>
                    <div className='lg:ml-3'>
                        <form onSubmit={handleFilter}>
                            <div className="flex">
                                <select name="publisher" className='h-12 mt-2 bg-black text-white mb-3 rounded-l-lg lg:p-3 p-1'>
                                    <option value="">Choose Publisher</option>
                                    {
                                        allPublishers.map(pub => (
                                            <option value={pub.name} key={pub._id}>{pub.name}</option>
                                        ))
                                    }
                                </select>
                                <select name="tag" className='h-12 mt-2 bg-black text-white mb-3 lg:p-3 p-1'>
                                    <option value="">Choose Tags</option>
                                    {Array.from(new Set(allNews.flatMap(news => news.tags))).map(tag => (
                                        <option key={tag} value={tag}>{tag}</option>
                                    ))}
                                </select>
                                <input className="h-12 mt-2 bg-black mb-3 rounded-r-lg text-white lg:w-32 p-3" type="submit" value="Filter" />
                            </div>
                        </form>
                    </div>
                    <form onSubmit={handleSearch} className="flex">
                        <input type="text" name="searchText" className='border border-black h-12 w-[400px] rounded-lg px-3' />
                        <input type="submit" value="Search" className='relative right-[10px] text-white bg-black h-12 w-32 rounded-r-lg' />
                    </form>
                </div>
                <div className='lg:grid grid-cols-4 lg:mx-20 items-center justify-center lg:mt-0 mt-10 p-3 gap-3'>
                    {
                        showNews.map(news => <News key={news._id} news={news} savedUser={savedUser} />)
                    }
                </div>
            </div>
        ) : (
            <div className='text-center my-10'>
                No Such Items
            </div>
        )
    );
};

export default Allnewsicles;


const News = ({ news, savedUser }) => {
    const isPremium = news.premium == "yes";
    const canViewDetails = !isPremium || (isPremium && savedUser?.premiumToken);


    useEffect(()=>{
        Aos.init();
      },[])

    return (
        <div data-aos="fade-up" className='p-5 flex flex-col justify-between rounded-xl bg-gray-100 lg:mb-0 mb-3 lg:h-[630px]'>
            <img className='h-[300px] w-full rounded-2xl' src={news.image} alt="" />
            <p className='dancing-script-font text-2xl my-2'>{news.title}</p>
            <div>
                <p className="">{news.publisher}</p>
                <div className="bg-white rounded-xl p-3 my-2">
                    <p>{news.description.slice(0, 100)} ...</p>
                </div>
                <div className="flex justify-end gap-1">
                    {isPremium && (
                        <div className='flex items-center font-bold px-2 rounded-lg bg-white'>
                            <PiStarFill className="text-yellow-500 mr-1" />
                            Premium
                        </div>
                    )}
                    <Link to={`details/${news._id}`}>
                        <button
                            className={`ml-1 text-black px-10 py-2 rounded-lg hover:bg-gray-200 ${
                                canViewDetails ? 'bg-blue-200' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            disabled={!canViewDetails}
                        >
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
