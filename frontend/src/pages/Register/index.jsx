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
import {
  setCancelText,
  setOnCancel,
  setOpen,
  setTitle,
} from "../../features/alert/alertSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const dataReq = {
        email,
        password,
        name,
      };

      const { data: dataRes } = await axios.post(
        `${RUTER_BASE}/api/v1/auth/register`,
        dataReq
      );
      const { status } = dataRes;
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
      if (message === "Email already exists!") {
        dispatch(setCancelText("Inicia Sesión"));
        dispatch(setOnCancel(() => navigate("/")));
      }
      dispatch(setOpen(true));
      dispatch(setTitle(message));
    }
  };

  return (
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
            Regístrate
          </Typography>
          <form style={{ width: "100%", marginTop: "1rem" }} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nombre"
              value={name}
              onChange={handleNameChange}
            />
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
              onClick={handleRegister}
            >
              Registrarse
            </Button>
            <Link href="/" variant="body2">
              ¿Ya tienes una cuenta? Inicia Sesión
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
