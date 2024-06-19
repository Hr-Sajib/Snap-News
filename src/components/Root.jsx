import { Outlet } from 'react-router-dom';
import Footer from './Shared/Footer';
import Navbar from './Shared/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar/>
            <div className='min-h-[440px]'>
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Root;