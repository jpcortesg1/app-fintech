import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link,
} from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { useLocation } from "react-router-dom";

const TopBar = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/";

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <WalletIcon />
          <Typography variant="h6">MyFintech</Typography>
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
        <Link
          href={isRoot ? "/register" : "/"}
          color="inherit"
          style={{ textDecoration: "none" }}
        >
          <Button color="inherit">
            {isRoot ? "Registrarse" : "Iniciar Sesión"}
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
