
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";





const Banner3 = () => {

    useEffect(()=>{
        Aos.init();
      },[])
    return (
        <div data-aos="fade-down" className="h-[900px]">
            <img className='mx-auto rounded-xl' src="https://i.ibb.co/2FCKYqY/banner3.jpg" alt="Banner" />
            <div className='flex gap-[200px]'>
                <ul className='list-disc ml-5 text-5xl relative left-[300px] bottom-[600px] text-white'>
                    <li className='bg-gray-500 p-5 rounded-t-2xl'>Top Stories</li>
                    <li className='bg-gray-500 p-5'>World News</li>
                    <li className='bg-gray-500 p-5'>National News</li>
                    <li className='bg-gray-500 p-5'>Local News</li>
                    <li className='bg-gray-500 p-5 rounded-b-2xl'>Business</li>
            
                </ul>
                <ul className='list-disc ml-5 text-5xl relative left-[300px] bottom-[600px] text-white'>
                   
                    <li className='bg-gray-500 p-5 rounded-t-2xl'>Technology</li>
                    <li className='bg-gray-500 p-5'>Entertainment</li>
                    <li className='bg-gray-500 p-5'>Sports</li>
                    <li className='bg-gray-500 p-5'>Health</li>
                    <li className='bg-gray-500 p-5 rounded-b-2xl'>Lifestyle</li>
                </ul>
            </div>
        </div>
    );
};

export default Banner3;
