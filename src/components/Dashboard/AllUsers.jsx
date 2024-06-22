import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Pagination from './Pagination'; // Assuming Pagination is in the same directory
import Aos from "aos";
import 'aos/dist/aos.css'


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3; // Number of users to show per page

  useEffect(() => {
    axios.get('https://snapnews-server.vercel.app/getUsers')
      .then(d => {
        setUsers(d.data);
      })
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);



  useEffect(()=>{
    Aos.init();
  },[])


  return (
    <div data-aos="fade-right">
      <h1 className='lg:ml-20 text-2xl'>All Users</h1>

      <div>
        <div className="overflow-x-auto lg:mx-20 lg:mt-10">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Profile Picture</th>
                <th>Name</th>
                <th className='text-left'>Email</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {
                currentUsers.map((user, index) => (
                  <Row 
                    user={user} 
                    key={user._id} 
                    index={index + indexOfFirstUser} 
                  />
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
      </div>
    </div>
  );
};

export default AllUsers;

const Row = ({ user, index }) => {
  const handleMakeAdmin = (id) => {
    axios.put(`https://snapnews-server.vercel.app/makeAdmin/${user.userEmail}`, { role: 'admin' }, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access-token')}`
      },
    })
      .then(res => {
        Swal.fire({
          title: `${user.name} is Admin Now`,
          text: 'Role Changed Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <tr data-aos="fade-down" className="bg-gray-200 lg:h-20 text-center">
      <th>{index + 1}</th>
      <td className="w-[100px] text-blue-800 text-lg text-center">
        <img className='h-12 lg:ml-2 w-12 rounded-xl' src={user.userImage} alt="" />
      </td>
      <td className="w-[400px] text-blue-800 text-lg text-center">{user.name}</td>
      <td className="w-[400px] text-blue-800 text-lg text-left">{user.userEmail}</td>
      <td className="w-[400px] text-blue-800 text-lg text-center">
        {
          user.role === 'admin' ?
            <p className='bg-gray-500 p-2 rounded-lg text-white lg:w-[200px] mx-auto'>Admin</p> :
            <button id={`makeAdmin${user._id}`} onClick={() => handleMakeAdmin(user._id)} className='bg-black text-white p-2 rounded-lg lg:w-[200px] hover:bg-blue-900'>
              Make Admin
            </button>
        }
      </td>
    </tr>
  );
};
