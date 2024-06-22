import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthProvider/AuthProvider';
import { addDurationToTime } from '../functions';
import { Helmet } from 'react-helmet-async';

const Subscription = () => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState({ days: 0, hours: 0, minutes: 1, seconds: 0 });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const handleSubscriptionChange = (event) => {
    const value = event.target.value;
    let duration = {};
    switch (value) {
      case '1 minute':
        duration = { days: 0, hours: 0, minutes: 1, seconds: 0 };
        break;
      case '5 days':
        duration = { days: 5, hours: 0, minutes: 0, seconds: 0 };
        break;
      case '10 days':
        duration = { days: 10, hours: 0, minutes: 0, seconds: 0 };
        break;
      default:
        duration = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        break;
    }
    setSubscriptionPeriod(duration);
  };

  const handleSubscribeClick = () => {
    const currentTime = new Date().toISOString();
    const premiumToken = addDurationToTime(currentTime, subscriptionPeriod); // Concatenate currentTime and subscriptionPeriod

    axios.put(`https://snapnews-server.vercel.app/updateUser/${email}`, { premiumToken }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(data => {
        console.log('Subscription Data Updated for that user in time : ', currentTime);
        console.log('Subscription Data Updated for that user till :', premiumToken);
    })
    .catch(error => {
        console.error('Error updating subscription data:', error);
    });

    navigate('/payment', { state: { period: subscriptionPeriod, price: getSubscriptionPrice(subscriptionPeriod) } });
  };

  const getSubscriptionPrice = (period) => {
    if (period.minutes === 1) return '$0.50';
    if (period.days === 5) return '$5.00';
    if (period.days === 10) return '$9.00';
    return '$0.00';
  };

  return (
    <div className="flex items-center p-6 mb-32 lg:mt-[80px] justify-center gap-10 border border-black rounded-xl lg:mx-[300px]">
      <Helmet>
                 <title>SnapNews Subscription</title>
      </Helmet>
      <img className="lg:h-[300px] rounded-xl" src="https://i.ibb.co/n3K7KQ2/sub.png" alt="Subscribe Banner" />
      <div className="w-full border max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Subscription Plan</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subscriptionPeriod">
            Choose Subscription Period
          </label>
          <select
            id="subscriptionPeriod"
            onChange={handleSubscriptionChange}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="1 minute">1 minute - $0.50</option>
            <option value="5 days">5 days - $5.00</option>
            <option value="10 days">10 days - $9.00</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-center text-xl">Price: {getSubscriptionPrice(subscriptionPeriod)}</p>
        </div>
        <button
          onClick={handleSubscribeClick}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default Subscription;
