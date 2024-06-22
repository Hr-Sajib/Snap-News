import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PiStarFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css'
import axios from "axios";

const PremiumArticles = () => {

        // Load news
        const [allNews, setAllNews] = useState([]);
    
        const { data: newsData, isLoading: isNewsLoading } = useQuery({
            queryKey: ['fetchNews'],
            queryFn: async () => {
                try {
                    const res = await axios.get(`https://snapnews-server.vercel.app/getPremArticles`,{
                        headers: {
                          authorization: `Bearer ${localStorage.getItem('access-token')}`
                        },
                      })
                    const news = res.data;
                    return news;
                } catch (error) {
                    console.error('Error fetching news:', error);
                    throw error;
                }
            }
        });
    
        useEffect(() => {
            if (newsData) {
                const a = newsData.filter(n=> n.premium == 'yes')
                setAllNews(a);

            }
        }, [newsData]);

        useEffect(()=>{
            Aos.init();
          },[])


    return (
        <div className="lg:mx-20">
                    {
                        allNews.map(news => <News key={news._id} news={news} />)
                    }
        </div>
    );
};

export default PremiumArticles;



const News = ({ news }) => {
    const isPremium = news.premium == "yes";

    return (
        <div  data-aos="fade-up" className='p-5 flex justify-between rounded-xl bg-gray-100 lg:mt-5'>
            <img className='lg:h-[360px] lg:w-[400px] rounded-2xl' src={news.image} alt="" />
            <div className="p-5 ">
                <div className="flex items-center gap-1">
                    <PiStarFill className="text-yellow-500 text-2xl mr-1" />
                    <p className='dancing-script-font text-3xl my-5'>{news.title}</p>
                </div>
                <div className="flex flex-col justify-between">
                    <p className="my-3">by <b>{news.publisher}</b></p>
                    <div className="bg-white rounded-xl p-3 my-2">
                        <p>{news.description.slice(0,300)} ...</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Link to={`details/${news._id}`}><button className="btn bg-blue-200 px-10 mt-10">Details</button></Link>
                </div>
            </div>
        </div>
    );
};
