import axios from "axios";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import  auth from "../../../firebase.config"

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const Gprovider = new GoogleAuthProvider();

    //sign up with google
    const googleSignUp=()=>{
        return signInWithPopup(auth, Gprovider)
    }



    // sign up
    const createUser=(auth, email, password)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
     }
 
 
     //login
     const loginUser=(email, password)=>{
         setLoader(true);
         return signInWithEmailAndPassword(auth, email, password)
     }
 
 
     // retain user info
     useEffect(()=>{
         const unsubscribe = onAuthStateChanged(auth, currentUser=>{
             setUser(currentUser);
             setLoader(false);
             if(currentUser){
                const curUser = currentUser.email;
                axios.post('https://snapnews-server.vercel.app/jwt', {curUser})
                .then(res=>{
                    if(res.data){
                        localStorage.setItem('access-token', res.data);
                    }
                })
             } 
             else{
                localStorage.removeItem('access-token');
             }
         })
         return()=>{
             unsubscribe();
         }
     },[])
 
     //log out
     const logOut =()=>{
         setLoader(true);
         return signOut(auth);
     }



    const userInfo = {
        user,
        googleSignUp,
        createUser,
        loginUser,
        logOut,
        loader,

    }

    return (
        <AuthContext.Provider value={userInfo}>
         {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;