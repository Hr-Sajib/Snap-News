import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNews } from '../functions';
import { PiStarFill } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";



const Allnewsicles = () => {

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




        const handleFilter =()=>{

        }


        if(allNews.length > 0){
            return (
                <div>
                    <div className='h-20 mx-24 border border-gray-300 rounded-xl flex items-center justify-between'>
                        <div className='ml-3'>
                            <form onSubmit={handleFilter}>
                                <div className="flex">
                                    <select name="category" className='h-12 mt-2 bg-black text-white mb-3 rounded-l-lg p-3'>
                                            <option value="">Choose Publisher</option>
                                            <option value="Publisher1">Publisher1</option>
                                            <option value="Publisher1">Publisher1</option>
                                    </select>
                                    <select name="category" className='h-12 mt-2 bg-black text-white mb-3 p-3'>
                                            <option value="">Choose Tags</option>
                                            <option value="Publisher1">Publisher1</option>
                                            <option value="Publisher1">Publisher1</option>
                                    </select>
                                    <input className="h-12 mt-2 bg-black mb-3 rounded-r-lg text-white w-32 p-3" type="submit" value="Filter" />
                                </div>
                            </form>
                        </div>
                        <form>
                            <input type="text" className='border border-black h-12 w-[400px] rounded-lg px-3' />
                            <input type="submit" value="Search" className='relative right-[10px] text-white bg-black h-12 w-32 rounded-r-lg'/>
                        </form>
                    </div>
                    
                    <div className='lg:grid grid-cols-4 lg:mx-20  items-center justify-center  p-3 gap-3'>

                    {
                        allNews.map(news =><News news={news}></News>)
                    }
                    </div>
                                
                </div>
            );
        }
        else{
            return(
                <div className="text-center mt-10">No Items to Show</div>
            )
        }
    
};

export default Allnewsicles;


const News =({news})=>{

    return(

        <div className='p-5 flex flex-col justify-between rounded-xl bg-gray-100 lg:mb-0 mb-3 lg:h-[630px]'>
            <img className='h-[300px] w-full rounded-2xl' src={news.image} alt="" />
            <p className='dancing-script-font text-2xl my-2'>{news.title}</p>
                
            <div>
                <p className="">{news.publisher}</p>
                <div className="bg-white rounded-xl p-3 my-2">
                    <p>{news.description.slice(0,100)} ...</p>
                </div>
                <div className="flex justify-end gap-1">
                    { news.premium == "yes" ? <div className='flex items-center font-bold px-2 rounded-lg bg-white'>< PiStarFill className="text-yellow-500 mr-1"/>Premium</div> : null}
                    <Link to={`details/${news._id}`}>
                        <button className="bg-blue-200 ml-1 text-black px-10 py-2 rounded-lg hover:bg-gray-200">Details</button>
                    </Link>
                </div>

            </div>
        </div>

    )
}