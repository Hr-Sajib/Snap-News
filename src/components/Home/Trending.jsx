import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from '../../functions';
import Aos from "aos";
import 'aos/dist/aos.css'

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
      const sortedArray = [...allNews].sort((a, b) => b.views - a.views);
      setTrendingNews(sortedArray.slice(0, 3));
  }, [allNews]);


  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    arrows: false,
  };
  ;

  useEffect(()=>{
    Aos.init();
  },[])


  return (
<div data-aos="fade-up" className="lg:mx-20 border rounded-xl p-4 shadow-lg bg-gradient-to-r to-blue-400/30 from-gray-200/30">
      <p className="text-xl font-bold mb-2 text-blue-800">Now Trending</p>
      <Slider {...sliderSettings}>
        {
          trendingNews.map((news, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img data-aos="fade-down" className="lg:h-[430px] lg:w-[600px] rounded-xl" src={news.image} />
              <div data-aos="fade-down" className="flex-1 mt-5">
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
