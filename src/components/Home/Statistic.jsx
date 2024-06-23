import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { fetchUsers } from "../../functions";
import Aos from "aos";
import 'aos/dist/aos.css'

const Statistic = () => {
    const [Users, setUsers] = useState([]);
    const { data, isLoading } = useQuery({
        queryKey: ['fetchUsers'],
        queryFn: fetchUsers,
    });

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    const normalUsers = Users.filter(user => user.premiumToken == null);
    const premiumUsers = Users.filter(user => user.premiumToken !== null);

    const { ref: totalUsersRef, inView: totalUsersInView } = useInView();
    const { ref: normalUsersRef, inView: normalUsersInView } = useInView();
    const { ref: premiumUsersRef, inView: premiumUsersInView } = useInView();



  useEffect(()=>{
    Aos.init();
  },[])
    return (
        <div   data-aos="zoom-in"
        className="p-10 bg-gray-100 lg:mx-20 rounded-xl lg:my-20 lg:mb-0 mb-10">
            <h2 className="text-2xl font-semibold mb-6">User Statistics</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div ref={totalUsersRef} className="p-6 rounded-lg   text-center bg-pink-800 text-white">
                        <h3 className="text-lg font-medium">Total Users</h3>
                        {totalUsersInView && (
                            <CountUp 
                                end={Users.length} 
                                duration={2} 
                                className="text-4xl font-bold mt-2" 
                            />
                        )}
                    </div>
                    <div ref={normalUsersRef} className=" p-6 rounded-lg   text-center  bg-yellow-600 text-white">
                        <h3 className="text-lg font-medium">Normal Users</h3>
                        {normalUsersInView && (
                            <CountUp 
                                end={normalUsers.length} 
                                duration={2} 
                                className="text-4xl font-bold mt-2" 
                            />
                        )}
                    </div>
                    <div ref={premiumUsersRef} className="p-6 rounded-lg   text-center  bg-blue-700 text-white">
                        <h3 className="text-lg font-medium">Premium Users</h3>
                        {premiumUsersInView && (
                            <CountUp 
                                end={premiumUsers.length} 
                                duration={2}
                                className="text-4xl font-bold mt-2" 
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistic;
