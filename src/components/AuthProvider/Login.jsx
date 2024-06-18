import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Login = () => {
    const [passwordShow, setPasswordShow] = useState(false);
    const {googleSignUp, loginUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();



    // handle log in
    const handleLogin =e=>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
        .then(res => {
          console.log(res.user);
          navigate(location?.state ? location.state : '/');
          
          e.target.email.value = "";
          e.target.password.value = "";
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    //google sign in
    const handleSignIpWithGoogle =()=>{
        googleSignUp()
        .then((res) => {
            console.log(res.user);
            navigate(location?.state ? location.state : '/');

            //send to server
            const newUser = { userEmail : res.user.email, premiumToken : null};

            
            fetch('http://localhost:5500/addUser',{
              method:"POST",
              headers:{
                  'content-type':'application/json'
              },
              body: JSON.stringify(newUser)
  
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data);
              // Swal.fire("Information Added");
          })



        })
        .catch((error) => {
            console.log(error.message);
        });
    
    }

    return (
        <div>
             <div>
              <p className='text-2xl text-center font-bold text-blue-400'>Log In</p>
            <div className='lg:w-[600px] flex flex-col items-center mb-2 pt-10 lg:p-5 p-3 pb-8 mx-2 lg:mt-10 rounded-xl bg-gray-200 lg:mx-auto animate__animated animate__zoomIn'>
              <form onSubmit={handleLogin} action="">
                <input className='rounded-lg p-2 lg:w-[500px] w-[320px]' type="email" name='email' required placeholder='Email' /> <br /> <br />
                <input className='rounded-lg p-2 lg:w-[500px] w-[320px]' 
                  name='password' 
                  type={ passwordShow ? 'text' : 'password' }
                  placeholder='Password' 
                  required/> <br />
                
                <div onClick={()=>setPasswordShow(!passwordShow)} className='w-5 flex justify-end relative lg:left-[460px] left-[280px] lg:bottom-[35px] bottom-[35px]'>
                    { passwordShow ? <LuEyeOff/> : <LuEye/> }
                </div>          
                
                <input className='bg-blue-600 rounded-lg text-white w-20 h-10' type="submit" value="Login" />
                
                <div className='flex justify-between gap-2 bg-gray-100 items-center rounded-lg px-1 pl-3 mt-5'>
                  <p className='my-3'>Not have an account yet?</p>
                  <Link to="/signup"><button className='bg-blue-900 rounded-lg text-white w-20 h-10'>Register</button></Link>
                </div>
              </form>
              <p className='mt-3 '>Or, Sign in with</p>

              <div className='flex gap-3 mt-1'>
                <div onClick={handleSignIpWithGoogle} className='flex items-center gap-1 bg-white rounded-lg p-2'><FaGoogle />Google</div>
                {/* <div onClick={handleSignIpWithGithub} className='flex items-center gap-1 bg-white rounded-lg p-2'><FaGithub />Github</div> */}
              </div>
            </div>
          </div>
        </div>
    );
};

export default Login;