import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from '../../functions';

const Trending = () => {
  const [allNews, setAllNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['fetchNews'],
    queryFn: fetchNews,
  });

  useEffect(() => {
    if (data) {
      setAllNews(data);
    }
  }, [data]);

  useEffect(() => {
    if (allNews.length > 0) {
      const sortedArray = [...allNews].sort((a, b) => b['view-count'] - a['view-count']);
      setTrendingNews(sortedArray.slice(0, 3));
    }
  }, [allNews]);

  console.log(trendingNews);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    arrows: false,
  };
  ;

  return (
    <div className="lg:mx-20 border rounded-xl p-4 shadow-lg">
        <p className="text-xl font-bold mb-2 text-gray-400">Now Trending</p>
      <Slider {...sliderSettings}>
        {
          trendingNews.map((news, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img className="lg:h-[430px] lg:w-[600px] w-[320px] rounded-xl" src={news.image} alt={news.title} />
              <div className="flex-1 mt-5">
                <h2 className="text-3xl font-semibold">{news.title}</h2>
                <p className="mt-2 text-xl">{news.description}</p>
              </div>
            </div>
          ))
        }
      </Slider>
    </div>
  );
};

export default Trending;
