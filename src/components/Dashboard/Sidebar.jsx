import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Aos from "aos";
import 'aos/dist/aos.css'

const Sidebar = () => {

    useEffect(()=>{
        Aos.init();
      },[])


    return (
        <div data-aos="fade-right" className="lg:w-64 lg:h-[700px] h-[300px] bg-gray-800 text-white lg:text-base text-sm rounded-xl">
            <ul className="p-4">
                <li className="mb-4">
                    <NavLink 
                        to="/dashboard/stats" 
                        className={({ isActive }) => 
                            isActive ? "text-blue-300 font-semibold" : "hover:text-gray-400"
                        }
                    >
                        Statistics
                    </NavLink>
                </li>
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
