import { useEffect } from 'react'
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");
    
    
    
    const login = (data) => {
        localStorage.setItem("token",data.token);
        const decoded = 
        jwtDecode(data.token);
        
        setUserName(decoded.name)
        setToken(data.token);
    }
    
    const logout = () => {
        localStorage.removeItem("token");
        setUserName("");
        setToken(null);
    }
    
    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if(savedToken){
            
            const decoded = 
            jwtDecode(savedToken);
            
            if(decoded.exp * 1000 < Date.now()){
                logout();
            }else{
                setToken(savedToken);
                setUserName(decoded.name)
            }
        }

        setLoading(false);

    }, []);

    const isAuthenticated = token !== null;
    
    // console.log(token);

  return (
    <AuthContext.Provider 
        value={{
            token,
            loading,
            login,
            logout,
            userName,
            isAuthenticated
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
