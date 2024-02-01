import {useState,useEffect,useContext,createContext} from 'react'
import axios from 'axios';

const AuthContext= createContext();


const AuthProvider= ({children})=>{
    const[auth,setAuth]=useState({
        user:null,
        token:"",
    });
    // default axios
    axios.defaults.headers.common['Authorization']= auth?.token;

    useEffect(()=>{
        const data=localStorage.getItem("auth");
        // data ko parse bhi krna hai
        const parseData=JSON.parse(data);
        if(data){
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
        }
    // eslint-disable-next-line
    },[])
    return(
    <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
    );
}

//custom hook
const useAuth=()=> useContext(AuthContext);

export {useAuth,AuthProvider};
