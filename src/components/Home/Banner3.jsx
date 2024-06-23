
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";





const Banner3 = () => {

    useEffect(()=>{
        Aos.init();
      },[])
    return (
        <div data-aos="fade-down" className="lg:h-[900px] h-[230px]">
            <img className='mx-auto rounded-xl' src="https://i.ibb.co/2FCKYqY/banner3.jpg" alt="Banner" />
            <div className='flex lg:gap-[200px] gap-5'>
                <ul className='list-disc lg:ml-5 lg:text-5xl relative lg:left-[300px] left-[25px] lg:bottom-[600px] bottom-[180px] text-white'>
                    <li className='bg-gray-500 lg:p-5 p-1 rounded-t-2xl'>Top Stories</li>
                    <li className='bg-gray-500 lg:p-5 p-1'>World News</li>
                    <li className='bg-gray-500 lg:p-5 p-1'>National News</li>
                    <li className='bg-gray-500 lg:p-5 p-1'>Local News</li>
                    <li className='bg-gray-500 lg:p-5 p-1 rounded-b-2xl'>Business</li>
            
                </ul>
                <ul className='list-disc lg:ml-5 lg:text-5xl relative lg:left-[300px] left-[30px] lg:bottom-[600px] bottom-[180px] text-white'>
                   
                    <li className='bg-gray-500 lg:p-5 p-1 rounded-t-2xl'>Technology</li>
                    <li className='bg-gray-500 lg:p-5 p-1'>Entertainment</li>
                    <li className='bg-gray-500 lg:p-5 p-1'>Sports</li>
                    <li className='bg-gray-500 lg:p-5 p-1'>Health</li>
                    <li className='bg-gray-500 lg:p-5 p-1 rounded-b-2xl'>Lifestyle</li>
                </ul>
            </div>
        </div>
    );
};

export default Banner3;
