import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchNews } from "../functions";
import { AuthContext } from "./AuthProvider/AuthProvider";

const MyArticles = () => {
    // Load news
    const [allNews, setAllNews] = useState([]);
    const [showNews, setShowNews] = useState([]);
    const { user } = useContext(AuthContext);
    const email = user?.email;

    const { data: newsData, isLoading: isNewsLoading } = useQuery({
        queryKey: ['fetchNews'],
        queryFn: fetchNews,
    });

    useEffect(() => {
        if (newsData) {
            setAllNews(newsData);
        }
    }, [newsData]);

    useEffect(() => {
        const myArticles = allNews.filter(news => news.authorEmail === email);
        setShowNews(myArticles);
    }, [allNews, email]);

    return (
        <div>
            <div className="overflow-x-auto lg:mx-20 lg:mt-10 ">
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
                        {
                            showNews.map((article, index) => (
                                <Row 
                                    article={article} 
                                    key={article._id} 
                                    index={index} 
                                    showNews={showNews} 
                                    setShowNews={setShowNews}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyArticles;

const Row = ({ article, index, showNews, setShowNews }) => {
    // Delete handle
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
                fetch(`http://localhost:5500/delete/${id}`, {
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
                        // Update UI by removing the deleted article
                        const remainingArticles = showNews.filter(art => art._id !== id);
                        setShowNews(remainingArticles);
                    }
                });
            }
        });
    };


    const showReason=()=>{
        Swal.fire({
            title: 'Decline Reason',
            text: `${article.approval.slice(16)}`,
            confirmButtonText: 'OK'
          });
    }


    return (
        <tr className="bg-gray-200 lg:h-20 text-center">
            <th>{index + 1}</th>
            <td className="w-[400px] text-blue-800 text-lg text-left">{article.title}</td>
            <td className="pl-10">
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
            <td className="pl-10">
                <Link to={`updateArticle/${article._id}`} className="bg-green-700 hover:bg-gray-500 px-5 py-3 text-white" to={`updateArticle/${article._id}`}>
                    Update
                </Link>
            </td>
            <td className="pl-10">
                <button onClick={() => handleDelete(article._id)} className="bg-red-700 hover:bg-gray-500 px-5 py-3 text-white">
                    Delete
                </button>
            </td>
        </tr>
    );
};
