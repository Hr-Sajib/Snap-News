import React, { useEffect, useRef } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const news = useLoaderData();
    const { id } = useParams();
    const hasIncrementedView = useRef(false);

    useEffect(() => {
        const updateViews = async () => {
            try {
                const response = await fetch(`http://localhost:5500/updateviews/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to update view count');
                }

                const result = await response.json();
                console.log(result.message);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!hasIncrementedView.current) {
            updateViews();
            hasIncrementedView.current = true;
        }
    }, [id]);

    return (
        <div className=' bg-gray-100'>
            <div className='p-5 flex gap-5 rounded-xl justify-center items-center lg:mb-0 mb-3 '>
            <img className='lg:h-[500px] lg:w-[600px] rounded-2xl' src={news.image} alt="" />
            <div>
                <p className='dancing-script-font text-2xl mb-10 lg:w-[600px]'>{news.title}</p>
                <p className="mb-5">by <b>{news.publisher}</b></p>
            </div>
            
        </div>
        <div className=" mx-auto rounded-xl p-5 my-2 lg:w-[1500px] text-xl pb-10">
            <p>{news.description}</p>
        </div>
        </div>
    );
};

export default ArticleDetails;
