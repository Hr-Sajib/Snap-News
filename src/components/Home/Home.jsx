import React from 'react';
import { Helmet } from "react-helmet-async";
import AllPublisher from './AllPublisher';
import Plans from './Plans';
import Statistic from './Statistic';
import Trending from './Trending';

const Home = () => {
    return (
        <div>
            <Helmet>
                 <title>SnapNews Home</title>
            </Helmet>
            <Trending/>
            <AllPublisher/>
            <Plans/>
            <Statistic/>

        </div>
    );
};

export default Home;