import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchNews } from "../../functions";



const AllAdminArticles = () => {

    const [allNews, setAllNews] = useState([]);

    const { data, isLoading } = useQuery({
        queryKey: ['fetchNews'],
        queryFn: fetchNews,
    });
    useEffect(() => {
        if (data) {
        setAllNews(data);
        }
    }, [data]);
        



    return (
        <div className="relative bottom-6 right-4">
            {
                allNews.map(news=><Article key={news._id} news={news}></Article>)
            }
        </div>
    );
};

export default AllAdminArticles;




const Article=({news})=>{

    
    return(
          <div className="flex bg-blue-100 p-4 rounded-xl mb-2">
                <img src={news.imageUrl} className="h-[300px] w-[320px] rounded-xl " alt="" />
                <div className="ml-5 mt-2">
                    <p className="text-2xl">{news.title}</p>
                    <div className="flex gap-1 bg-white p-3 rounded-xl w-[400px] mt-3">
                        <div className="flex gap-1">
                            <img src={news.auhtorImage} className="rounded-full h-16" alt="" />
                            <div className="ml-2">
                                <p className="text-xl">{news.authorName}</p>
                                <p className="text-xl">{news.authorEmail}</p>
                            </div>  
                        </div>
                    </div>
                    <p className="bg-white p-1 rounded-lg mt-1 w-[400px] pl-5">Date : {news.date}</p>
                    <p className="bg-white p-1 rounded-lg mt-1 w-[400px] pl-5">Publisher : {news.publisher}</p>

                    <div className="flex gap-1 mt-5">
                        <button className="bg-black text-white h-12 w-36 rounded-xl">Aprove</button>
                        <button className="bg-black text-white h-12 w-36 rounded-xl">Decline</button>
                        <button className="bg-black text-white h-12 w-36 rounded-xl">Delete</button>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-12 w-36 rounded-xl">Make Premium</button>
                    </div>
                </div>
          </div>
    )
}

