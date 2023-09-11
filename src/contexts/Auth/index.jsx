import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [cookies, setCookie, removeCookie] = useCookies();

    
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(true)
    const notify = () => toast.error('Confira se os dados estão corretos!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    
    useEffect(() => {
        if(cookies.token){
            setToken(cookies.token)
            console.log(cookies.token)
        }
        setLoading(false)
    })

    async function login(form) {

        
        try {
            setLoading(true)
            
            const { data } =  await axios.post("http://localhost:3000/auth", form)

            setToken(data.access_token)

            setCookie("token", data.access_token)
            
        } catch (error) {

            notify()
            
        }
        finally {
            setLoading(false)
        }
        
    }

    return (
        <AuthContext.Provider value={{ token, login, loading, setLoading }}>
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;