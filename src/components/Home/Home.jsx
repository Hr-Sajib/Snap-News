import React from 'react';
import { Helmet } from "react-helmet-async";
import AllPublisher from './AllPublisher';
import Plans from './Plans';
import Trending from './Trending';

const Home = () => {
    return (
        <div>
            <Trending/>
            <AllPublisher/>
            <Plans/>
        </div>
    );
};

export default Home;