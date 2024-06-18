import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Subscription = () => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('1 minute');
  const navigate = useNavigate();

  const handleSubscriptionChange = (event) => {
    setSubscriptionPeriod(event.target.value);
  };

  const handleSubscribeClick = () => {
    // Navigate to the payment page with the selected subscription period and price
    console.log('/payment', { state: { period: subscriptionPeriod, price: getSubscriptionPrice(subscriptionPeriod) } });
  };

  const getSubscriptionPrice = (period) => {
    switch (period) {
      case '1 minute':
        return '$0.50';
      case '5 days':
        return '$5.00';
      case '10 days':
        return '$9.00';
      default:
        return '$0.00';
    }
  };

  return (
    <div className="flex items-center p-6 mb-32 lg:mt-[80px] justify-center gap-10 border border-black rounded-xl lg:mx-[300px]">
      <img className=" lg:h-[300px] rounded-xl" src="https://i.ibb.co/n3K7KQ2/sub.png" alt="Subscribe Banner" />
      <div className="w-full border max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Subscription Plan</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subscriptionPeriod">
            Choose Subscription Period
          </label>
          <select
            id="subscriptionPeriod"
            value={subscriptionPeriod}
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
        <Link to="/payment"><button
          onClick={handleSubscribeClick}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Subscribe Now
        </button></Link>
      </div>
    </div>
  );
};

export default Subscription;
