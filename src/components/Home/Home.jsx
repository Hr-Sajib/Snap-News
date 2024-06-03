import React from 'react';
import { Helmet } from "react-helmet-async";
import Plans from './Plans';
import Trending from './Trending';

const Home = () => {
    return (
        <div>
            <Trending/>
            <Plans/>
        </div>
    );
};

export default Home;