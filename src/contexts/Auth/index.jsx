import { useState, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { api } from "../../service/api.js";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const notify = () =>
    toast.error("Confira se os dados estão corretos!", {
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
    const checkToken = async () => {
      if (cookies.token) {
        console.log(cookies.token);
        setToken(cookies.token);
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  async function login(form) {
    try {
      setLoading(true);

      const { data } = await api.post("/auth", form);

      setToken(data.access_token);

      setCookie("token", data.access_token, {
        expires: new Date(Date.now() + 31536000),
      });
    } catch (error) {
      notify();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ token, login, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
