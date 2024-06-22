
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";


const Banner2 = () => {

    useEffect(()=>{
        Aos.init();
      },[])
    return (
        <div data-aos="fade-down" className=" h-[800px]">
            <img className="mx-auto lg:h-[760px] rounded-xl" src="https://i.ibb.co/T4Cfpzp/banner2.jpg" alt="" />
            <div className="relative lg:left-[300px] lg:bottom-[600px]">
                <p className="text-gray-300 lg:text-[120px]">ALL NEWS</p>
                <p className="text-gray-300 lg:text-[80px]">Under Your </p>
                <p className="text-gray-300 lg:text-[120px]">FINGERTIPS</p>

            </div>
        </div>
    );
};

export default Banner2;