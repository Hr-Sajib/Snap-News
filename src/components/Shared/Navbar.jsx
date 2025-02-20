import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Aos from "aos";
import 'aos/dist/aos.css';

const Navbar = () => {

    useEffect(() => {
        Aos.init();
    }, []);

    const { user, logOut } = useContext(AuthContext);
    const email = user?.email;

    const [savedUser, setSavedUser] = useState(null);

    useEffect(() => {
        if (email) {
            axios.get(`https://snapnews-server.vercel.app/getUser/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                },
            })
            .then(data => {
                setSavedUser(data.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, [email]);

    const handleLogOut = () => {
        logOut()
        .then(() => {
            Swal.fire({
                title: "Logged Out",
                icon: "success"
            });
        }).catch((error) => {
            console.log(error.message);
        });
    }

    const getProfileImage = () => {
        return user?.photoURL || savedUser?.userImage;
    }

    const u = savedUser && user;

    const navlinks = 
        <>
            <li className="mr-1"><NavLink to="/">Home</NavLink></li>
            { user && <li className="mr-1"><NavLink to="/add-articles">Add Articles</NavLink></li> }
            <li className="mr-1"><NavLink to="/all-articles">All Articles</NavLink></li>
            { user && <li className="mr-1"><NavLink to="/subscription">Subscription</NavLink></li> }
            { savedUser?.role === 'admin' && <li className="mr-1"><NavLink to="/dashboard">Dashboard</NavLink></li> }
            { user && <li className="mr-1"><NavLink to="/my-articles">My Articles</NavLink></li> }
            { savedUser?.premiumToken && <li className="mr-1"><NavLink to="/premium-articles">Premium Articles</NavLink></li> }
            { user && <li className="mr-1"><NavLink to="/my-profile">My Profile</NavLink></li> }
        </>

    return (
        <div className='lg:mx-20 lg:mt-10 lg:mb-5'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinks}
                        </ul>
                    </div>
                    <a href='/' className="btn btn-ghost text-xl">SnapNews</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div>
                        { u &&
                            <div className="lg:flex hidden px-3 gap-1">
                                <div data-aos="fade-left">
                                    <p className="font-bold text-right">{savedUser.name}</p>
                                    <p className="text-[14px] text-right">{user.email}</p>
                                </div>
                                <div className="tooltip" data-aos="zoom-in" data-tip={user.displayName}>
                                    <img className="w-12 border border-black rounded-full" src={getProfileImage()} alt="" />
                                </div>
                            </div>
                        }
                    </div>
                    { user ? 
                        <div className='flex gap-1'>
                            <button onClick={handleLogOut} className="bg-black text-white px-3 py-2 rounded-lg">Logout</button>
                            <img className="w-10 lg:hidden border border-black rounded-full" src={getProfileImage()} alt="" />
                        </div> :
                        <div className='flex'>
                            <Link to="/login"><button className="bg-black text-white px-3 py-2 rounded-lg mr-1">Login</button></Link>
                            <Link to="/signup"><button className="bg-black text-white px-3 py-2 rounded-lg">Register</button></Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
