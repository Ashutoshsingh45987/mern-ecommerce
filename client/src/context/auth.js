import {useState,useEffect,useContext,createContext} from 'react'

const AuthContext= createContext();


const AuthProvider= ({children})=>{
    const[auth,setAuth]=useState({
        user:null,
        token:"",
    });
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
