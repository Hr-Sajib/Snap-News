import React, { useEffect, useRef } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const news = useLoaderData();
    const { id } = useParams();
    const hasIncrementedView = useRef(false);

    console.log(news)

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
        <div className='p-5 flex gap-5 rounded-xl justify-center items-center bg-gray-100 lg:mb-0 mb-3 '>
            <img className='lg:h-[500px] rounded-2xl' src={news.imageUrl} alt="" />
            <div>
                <p className='dancing-script-font text-2xl mb-10'>{news.title}</p>
                <p className="mb-5">by <b>{news.publisher}</b></p>
                <div className="bg-white rounded-xl p-5 my-2 lg:w-[600px]">
                    <p>{news.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
