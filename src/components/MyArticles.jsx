import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchNews } from "../functions";
import { AuthContext } from "./AuthProvider/AuthProvider";
import Aos from "aos";
import 'aos/dist/aos.css';
import axios from "axios";

const MyArticles = () => {
    const [allNews, setAllNews] = useState([]);
    const [showNews, setShowNews] = useState([]);
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const { data: newsData, isLoading: isNewsLoading } = useQuery({
        queryKey: ['fetchNews'],
        queryFn: async () => {
                try {
                    const res = await axios.get(`https://snapnews-server.vercel.app/getArticles/${email}`,{
                        headers: {
                          authorization: `Bearer ${localStorage.getItem('access-token')}`
                        },
                      })
                    const news = res.data;
                    return news;
                } catch (error) {
                    console.error('Error fetching news:', error);
                    throw error;
                }
            },
    });

    useEffect(() => {
        if (newsData) {
            setAllNews(newsData);
        }
    }, [newsData]);

    useEffect(() => {
        if (allNews.length > 0 && email) {
            const myArticles = allNews.filter(news => news.authorEmail === email);
            setShowNews(myArticles);
        }
    }, [allNews, email]);

    useEffect(() => {
        Aos.init();
    }, []);

    return (
        showNews.length !== 0 ?
        <div>
            <Helmet>
                <title>SnapNews My Articles</title>
            </Helmet>
            <div className="overflow-x-auto lg:mx-20 lg:mt-10 ">
                {isNewsLoading ? (
                    <div className="text-center text-2xl">Loading...</div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th></th>
                                <th>Title</th>
                                <th className="pl-10">Details</th>
                                <th>Status</th>
                                <th>isPremium</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showNews.map((article, index) => (
                                <Row
                                    article={article}
                                    key={article._id}
                                    index={index}
                                    showNews={showNews}
                                    setShowNews={setShowNews}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

        :
        <p className="text-center">
            No Posts Yet
        </p>


    );
};

export default MyArticles;

const Row = ({ article, index, showNews, setShowNews }) => {
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://snapnews-server.vercel.app/delete/${id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Article has been deleted.",
                            icon: "success"
                        });
                        const remainingArticles = showNews.filter(art => art._id !== id);
                        setShowNews(remainingArticles);
                    }
                });
            }
        });
    };

    const showReason = () => {
        Swal.fire({
            title: 'Decline Reason',
            text: `${article.approval.slice(16)}`,
            confirmButtonText: 'OK'
        });
    };

    return (
        <tr data-aos="fade-up" className="bg-gray-200 lg:h-20 text-center">
            <th>{index + 1}</th>
            <td className="w-[400px] text-blue-800 text-lg text-left">{article.title}</td>
            <td data-aos="zoom-in" className="pl-10">
                <Link className="bg-blue-700 hover:bg-gray-500 px-5 py-3 text-white" to={`details/${article._id}`}>
                    Details
                </Link>
            </td>
            <td className={`w-[200px] text-white py-3 ${article.approval[0] === 'a' ? 'bg-green-600' : article.approval === 'no' ? 'bg-yellow-600' : 'bg-red-600'}`}>
                {article.approval === 'no' ? 'Pending' : article.approval.slice(0, 8)}
                <br />
                {article.approval[0] === 'd' && (
                    <button onClick={showReason} className="bg-red-100 text-black p-2">Click To See Reason</button>
                )}
            </td>
            {article.premium === 'yes' ? (
                <td className="text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-20">
                    Premium
                </td>
            ) : (
                <td className="text-center bg-gradient-to-r from-gray-400 to-gray-600 text-white w-20">
                    Normal
                </td>
            )}
            <td data-aos="zoom-in" className="pl-10">
                <Link to={`updateArticle/${article._id}`} className="bg-green-700 hover:bg-gray-500 px-5 py-3 text-white">
                    Update
                </Link>
            </td>
            <td data-aos="zoom-in" className="pl-10">
                <button onClick={() => handleDelete(article._id)} className="bg-red-700 hover:bg-gray-500 px-5 py-3 text-white">
                    Delete
                </button>
            </td>
        </tr>
    );
};
