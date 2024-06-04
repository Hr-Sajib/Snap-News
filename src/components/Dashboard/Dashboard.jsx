import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import AllUsers from './AllUsers'; 
import AllAdminArticles from './AllAdminArticles';
import AddPublisher from './AddPublisher';

const Dashboard = () => {
    return (
        <div className="flex mx-20">
            <Sidebar />
            <div className="flex-1 p-6">
                <Routes>
                    <Route path="all-users" element={<AllUsers />} />
                    <Route path="all-articles" element={<AllAdminArticles />} />
                    <Route path="add-publisher" element={<AddPublisher />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
