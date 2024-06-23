import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import AllUsers from './AllUsers'; 
import AllAdminArticles from './AllAdminArticles';
import AddPublisher from './AddPublisher';
import PieChart from './PieChart';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    return (
        <div className="flex lg:mx-20">
            <Helmet>
                 <title>SnapNews Admin</title>
            </Helmet>
            <Sidebar />
            <div className="flex-1 p-6">
                <Routes>
                    <Route path="stats" element={<PieChart />} />
                    <Route path="all-users" element={<AllUsers />} />
                    <Route path="all-articles" element={<AllAdminArticles />} />
                    <Route path="add-publisher" element={<AddPublisher />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
