
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Aos from "aos";
import 'aos/dist/aos.css'

const Plans = () => {
  const navigate = useNavigate();

  const handleNavigate = (event, path) => {
    event.preventDefault(); // Prevent default link behavior
    navigate(path);
  };


   

  useEffect(()=>{
    Aos.init();
  },[])

  return (
    <div  data-aos="zoom-in" className="lg:flex justify-center gap-20 mt-10 lg:mb-0 mb-10">
      <div className="border lg:mx-0 mx-auto lg:h-[420px] bg-blue-50 flex flex-col justify-between rounded-lg p-6 w-80 hover:bg-white shadow-lg lg:mb-0 mb-4">
        <div className="mb-4 text-center">
          <p className="bg-pink-200 text-pink-800 py-1 px-2 rounded-full inline-block mb-2">Free For 1 Month</p>
          <h3 className="text-xl font-bold">Premium Individual</h3>
          <p className="text-lg font-semibold mt-2">FREE</p>
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>1 Premium account</li>
          <li>Cancel anytime</li>
          <li>15 hours/month of listening time from our audiobooks subscriber catalog</li>
        </ul>
        <button onClick={(event) => handleNavigate(event, '/subscription')} className="bg-pink-500 text-white py-2 px-4 rounded-lg w-full hover:bg-pink-600">
          Try free for 1 month
        </button>
        <p className="text-sm text-gray-600 mt-4">
          Free for 1 month, then $10.99 per month after. Offer only available if you haven't tried Premium before. <Link to="#" className="text-pink-500 underline">Terms apply.</Link>
        </p>
      </div>

      <div className="border mx-auto lg:mx-0 lg:h-[420px] bg-blue-50 flex flex-col justify-between rounded-lg p-6 w-80 hover:bg-white shadow-lg lg:mb-0 mb-4">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold">Premium Duo</h3>
          <p className="text-lg font-semibold mt-2">$14.99</p>
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>2 Premium accounts</li>
          <li>Cancel anytime</li>
          <li>15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)</li>
        </ul>
        <button onClick={(event) => handleNavigate(event, '/subscription')} className="bg-yellow-500 text-white py-2 px-4 rounded-lg w-full hover:bg-yellow-600">
          Get Premium Duo
        </button>
        <p className="text-sm text-gray-600 mt-4">
          For couples who reside at the same address. <Link to="#" className="text-yellow-500 underline">Terms apply.</Link>
        </p>
      </div>

      <div className="border mx-auto lg:mx-0 lg:h-[420px] bg-blue-50 flex flex-col justify-between rounded-lg p-6 w-80 hover:bg-white shadow-lg">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold">Premium Family</h3>
          <p className="text-lg font-semibold mt-2">$16.99</p>
        </div>
        <ul className="list-disc list-inside mb-4">
          <li>Up to 6 Premium or Kids accounts</li>
          <li>Cancel anytime</li>
          <li>15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)</li>
        </ul>
        <button onClick={(event) => handleNavigate(event, '/subscription')} className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600">
          Get Premium Family
        </button>
        <p className="text-sm text-gray-600 mt-4">
          For up to 6 family members residing at the same address. <Link to="#" className="text-blue-500 underline">Terms apply.</Link>
        </p>
      </div>
    </div>
  );
};

export default Plans;

