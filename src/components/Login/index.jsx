import { useState, useContext } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "primereact/button";

import "./style.css";
import { AuthContext } from "../../contexts/Auth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { login } = useContext(AuthContext);

  function onSubmit() {
    login(form);
  }

  return (
    <main className="mainLogin">
        
      <ToastContainer/>

      <form className="conteinerForm">
        <img src="./Logo.svg" alt="" />

        <h2>LOGIN</h2>

        <TextField
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          fullWidth
          id="standard-basic"
          label="Email"
          variant="standard"
        />

        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          size="small"
          style={{
            marginTop: "20px",
          }}
          label="ENTRAR"
          severity="info"
        />
      </form>
    </main>
  );
}
