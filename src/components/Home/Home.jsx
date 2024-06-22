import React from 'react';
import { Helmet } from "react-helmet-async";
import AllPublisher from './AllPublisher';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
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
            <Banner2/>
            <Banner3/>
            <Plans/>
            <Statistic/>

        </div>
    );
};

export default Home;