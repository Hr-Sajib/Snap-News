import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 h-[700px] bg-gray-800 text-white rounded-xl">
            <ul className="p-4">
                <li className="mb-4">
                    <NavLink 
                        to="/dashboard/all-users" 
                        className={({ isActive }) => 
                            isActive ? "text-blue-300 font-semibold" : "hover:text-gray-400"
                        }
                    >
                        All Users
                    </NavLink>
                </li>
                <li className="mb-4">
                    <NavLink 
                        to="/dashboard/all-articles" 
                        className={({ isActive }) => 
                            isActive ? "text-blue-300 font-semibold" : "hover:text-gray-400"
                        }
                    >
                        All Articles
                    </NavLink>
                </li>
                <li className="mb-4">
                    <NavLink 
                        to="/dashboard/add-publisher" 
                        className={({ isActive }) => 
                            isActive ? "text-blue-300 font-semibold" : "hover:text-gray-400"
                        }
                    >
                        Add Publisher
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
