import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [cookies, setCookie, removeCookie] = useCookies();

    const [token, setToken] = useState()

    useEffect(() => {

        console.log(cookies);
        
    }, [])

    async function login(form) {

        
        try {
            
            const { data } =  await axios.post("https://api.escuelajs.co/api/v1/auth/login", form)

            setToken(data.access_token)

            setCookie("token", data.access_token, {expires: new Date()})
            
        } catch (error) {

            console.log(error)
            
        }
        
    }

    return (
        <AuthContext.Provider value={{ token, login }}>
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;