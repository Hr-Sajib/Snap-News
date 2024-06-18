import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PiStarFill } from "react-icons/pi";
import { fetchNews } from "../functions";

const PremiumArticles = () => {

        // Load news
        const [allNews, setAllNews] = useState([]);
    
        const { data: newsData, isLoading: isNewsLoading } = useQuery({
            queryKey: ['fetchNews'],
            queryFn: fetchNews,
        });
    
        useEffect(() => {
            if (newsData) {
                const a = newsData.filter(n=> n.premium == 'yes')
                setAllNews(a);

            }
        }, [newsData]);


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
        <div className='p-5 flex justify-between rounded-xl bg-gray-100 lg:mt-5'>
            <img className='lg:h-[360px] lg:w-[400px] rounded-2xl' src={news.imageUrl} alt="" />
            <div className="p-5 ">
                <div className="flex items-center gap-1">
                    <PiStarFill className="text-yellow-500 text-2xl mr-1" />
                    <p className='dancing-script-font text-3xl my-5'>{news.title}</p>
                </div>
                <div className="flex flex-col justify-between">
                    <p className="my-3">by <b>{news.publisher}</b></p>
                    <div className="bg-white rounded-xl p-3 my-2">
                        <p>{news.description}</p>
                    </div>
                
                </div>
            </div>
        </div>
    );
};
