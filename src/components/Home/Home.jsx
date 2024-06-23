
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AllPublisher from './AllPublisher';
import Banner2 from './Banner2';
import Banner3 from './Banner3';
import Modal from "./Modal";
import Plans from './Plans';
import Statistic from './Statistic';
import Trending from './Trending';

const Home = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000); 

        return () => clearTimeout(timer); 
    }, []);

    return (
        <div className="lg:mx-0 mx-1">
            <Helmet>
                <title>SnapNews Home</title>
            </Helmet>
            <Trending />
            <AllPublisher />
            <Banner2 />
            <Banner3 />
            <Plans />
            <Statistic />
            {showModal && <Modal setShowModal={setShowModal} />}
        </div>
    );
};

export default Home;

