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
        <div id="modal" className="fixed z-10 inset-0 bg-gray-700 bg-opacity-30 backdrop-blur-sm">
            <div data-aos="zoom-in" className="bg-white lg:w-[700px] lg:h-[300px] text-center rounded-2xl p-10 mt-[300px] mx-auto">
                <p className="text-6xl mt-5">SUBSCRIBE</p>
                <p>For Greater Experience</p>
                <div className="flex justify-center mt-5">
                    <button onClick={handleClose} className="btn bg-black text-gray-200 hover:text-black">Close</button>
                    <button onClick={()=>navigate('/subscription')} className="btn bg-black w-48 text-gray-200 hover:text-black">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;