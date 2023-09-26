import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { api } from "../../service/api.js";

export const AuthContext = createContext();

function AuthProvider({ children }) {
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
    setLoading(true)
    const checkToken = () => {
      const token = Cookies.get('token')
      if (token) {
        setToken(token);
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

      Cookies.set('token', data, { expires: 7 })
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
