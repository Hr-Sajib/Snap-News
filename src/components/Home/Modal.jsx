import { useNavigate } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

const Modal = ({setShowModal}) => {

    const navigate = useNavigate();
    const handleClose=()=> {
        setShowModal(false)
    }
    useEffect(()=>{
        Aos.init();
      },[])
    return (
        <div className="fixed z-10 inset-0 bg-gray-700 bg-opacity-30 backdrop-blur-sm">
            <div data-aos="zoom-in" className="bg-gradient-to-r from-gray-100 to-gray-100 lg:w-[700px] w-[300px] border border-black lg:h-[300px] text-center rounded-2xl lg:p-10 p-4 mt-[300px] mx-auto">
                <p className="lg:text-7xl text-3xl mt-5">SUBSCRIBE</p>
                <p>For Greater Experience</p>
                <div className="flex gap-1 justify-center mt-5">
                    <button onClick={handleClose} className="btn border-0 bg-black text-gray-200 hover:text-black">Close</button>
                    <button onClick={()=>navigate('/subscription')} className="button-animate btn border-0 bg-black w-48 text-gray-200 hover:bg-black">Subscribe<span className="-rotate-90">↓</span></button>
                </div>
            </div>
        </div>
    );
};

export default Modal;