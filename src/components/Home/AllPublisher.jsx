import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // Assuming you are using React Query
import { fetchNews } from '../../functions'; // Assuming fetchNews function is defined

const AllPublisher = () => {
  const [allNews, setAllNews] = useState([]);
  const [publishers, setPublishers] = useState([]);

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
    // Extract unique publisher names from allNews
    const uniquePublishers = allNews.reduce((acc, curr) => {
      if (!acc.includes(curr.publisher)) {
        acc.push(curr.publisher);
      }
      return acc;
    }, []);
    setPublishers(uniquePublishers);
  }, [allNews]);



  return (
    <div className="max-w-lg lg:m-20 shadow rounded-xl p-5 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">All Publishers</h2>
      <ul className="divide-y divide-gray-200">
        {publishers.map((publisher, index) => (
          <li key={index} className="py-2">
            <span className="text-lg">{publisher}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPublisher;
