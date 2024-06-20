import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
      {allNews.map(news => (
        <Article key={news._id} news={news} />
      ))}
    </div>
  );
};

export default AllAdminArticles;

const Article = ({ news }) => {
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:5500/approvePost/${id}`, { approval: 'approved' }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(data => {
        console.log(data.data);
        Swal.fire({
          title: 'Approved!',
          text: 'Post Approved Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        document.getElementById(`approveBtn${id}`).innerText = 'Approved';
        document.getElementById(`approveBtn${id}`).classList.remove('bg-black')
        document.getElementById(`approveBtn${id}`).classList.add('bg-gray-500')

        document.getElementById(`declineBtn${id}`).innerText = 'Decline';
        document.getElementById(`declineBtn${id}`).classList.remove('bg-gray-500')
        document.getElementById(`declineBtn${id}`).classList.add('bg-black')
      })
      .catch(error => {
        console.error('Error updating post data:', error);
      });
  };

  const handleDecline = (id) => {
    Swal.fire({
      title: 'Decline Post',
      input: 'text',
      inputPlaceholder: 'Reason for declining...',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        return axios
          .put(`http://localhost:5500/declinePost/${id}`, { approval: `declined/reason:${reason}` }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(data => {
            console.log(data.data);
            document.getElementById(`declineBtn${id}`).innerText = 'Declined';
            document.getElementById(`declineBtn${id}`).classList.remove('bg-black');
            document.getElementById(`declineBtn${id}`).classList.add('bg-gray-500');
  
            document.getElementById(`approveBtn${id}`).innerText = 'Approve';
            document.getElementById(`approveBtn${id}`).classList.remove('bg-gray-500');
            document.getElementById(`approveBtn${id}`).classList.add('bg-black');
  
            Swal.fire({
              title: 'Declined!',
              text: 'Post Declined!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          })
          .catch(error => {
            console.error('Error updating post data:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to decline post. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  };
  

  return (
    <div className="flex bg-blue-100 p-4 rounded-xl mb-2">
      <img src={news.image} className="h-[300px] w-[320px] rounded-xl" alt="" />
      <div className="ml-5 mt-2">
        <p className="text-2xl">{news.title}</p>
        <div className="flex gap-1 bg-white p-3 rounded-xl w-[400px] mt-3">
          <div className="flex gap-1">
            <img src={news.authorImage} className="rounded-full h-16" alt="" />
            <div className="ml-2">
              <p className="text-xl">{news.authorName}</p>
              <p className="text-xl">{news.authorEmail}</p>
            </div>
          </div>
        </div>
        <p className="bg-white p-1 rounded-lg mt-1 w-[400px] pl-5">Date : {news.date}</p>
        <p className="bg-white p-1 rounded-lg mt-1 w-[400px] pl-5">Publisher : {news.publisher}</p>
        <div className="flex gap-1 mt-5">


        <button
            id={`approveBtn${news._id}`}
            onClick={() => handleApprove(news._id)}
            className={`hover:bg-green-600 text-white h-12 w-36 rounded-xl ${news.approval === 'approved' ? 'bg-gray-500' : 'bg-black'}`}
            >
            {news.approval === 'approved' ? 'Approved' : 'Approve'}
        </button>

        <button
            id={`declineBtn${news._id}`}
            onClick={() => handleDecline(news._id)}
            className={`hover:bg-red-600 text-white h-12 w-36 rounded-xl ${news.approval.slice(0,8) === 'declined' ? 'bg-gray-500' : 'bg-black'}`}
            >
            {news.approval === 'declined' ? 'Declined' : 'Decline'}
        </button>


          <button className="bg-black text-white h-12 w-36 rounded-xl">Delete</button>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white h-12 w-36 rounded-xl">Make Premium</button>
        </div>
      </div>
    </div>
  );
};
