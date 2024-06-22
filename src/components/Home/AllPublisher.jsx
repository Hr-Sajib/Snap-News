import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { fetchPublishers } from '../../functions'; 
import Aos from "aos";
import 'aos/dist/aos.css'



const AllPublisher = () => {
  const [publishers, setPublishers] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['fetchPublishers'],
    queryFn: fetchPublishers,
  });

  useEffect(() => {
    if (data) {
      setPublishers(data);
    }
  }, [data]);


  useEffect(()=>{
    Aos.init();
  },[])

  return (
    <div  data-aos="zoom-in"
 className="max-w-lg lg:m-20 shadow rounded-xl p-5 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">All Publishers</h2>
      <ul className="divide-y divide-gray-200">
        {publishers.map((publisher, index) => (
          <li key={index} className="py-2">
            <div data-aos="fade-down" className='flex gap-1 items-center'>
              <img src={publisher.logo} className="h-10 w-10 rounded-full border" alt="" />
              <span className="text-lg">{publisher.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPublisher;
