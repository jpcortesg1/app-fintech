import { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import axios from "axios";
import RUTER_BASE from "../../utils/getRouteBase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJwt } from "../../features/auth/authSlice";
import {
  setCancelText,
  setOnCancel,
  setOpen,
  setTitle,
} from "../../features/alert/alertSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const dataReq = {
        email,
        password,
      };

      const { data: dataRes } = await axios.post(
        `${RUTER_BASE}/api/v1/auth/`,
        dataReq
      );
      const { status, data } = dataRes;
      const { jwt } = data;
      dispatch(setJwt(jwt));
      if (status === 200) {
        navigate("/");
      }
    } catch (error) {
      const data = error?.response?.data;
      if (!data) {
        dispatch(setCancelText(""));
        dispatch(setOpen(true));
        dispatch(setTitle(error.message));
        return;
      }
      const { message } = data;
      dispatch(setCancelText(""));
      if (message === "Email not found!") {
        dispatch(setOnCancel(() => navigate("/register")));
        dispatch(setCancelText("Registrarse"));
      }
      dispatch(setOpen(true));
      dispatch(setTitle(message));
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <form style={{ width: "100%", marginTop: "1rem" }} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Correo Electrónico"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                style={{ margin: "1rem 0" }}
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
              <Link href="/register" variant="body2">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
