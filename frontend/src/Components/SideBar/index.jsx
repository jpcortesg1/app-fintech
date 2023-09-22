import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  BarChart as BarChartIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ExitToApp as ExitToAppIcon,
  AccountBalance,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { loggout } from "../../features/auth/authSlice";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    // ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const theme = createTheme({
  palette: {
    type: "dark", // Indica que es un tema oscuro
    primary: {
      main: "#2196f3", // Color principal
    },
    secondary: {
      main: "#f50057", // Color secundario
    },
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(loggout());
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          sx={{
            position: "relative",
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Tablero" />
            </ListItem>
            <ListItem button component={Link} to="/account">
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Cuentas" />
            </ListItem>
            <ListItem button component={Link} to="/budgets">
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Presupuestos" />
            </ListItem>
          </List>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ExitToAppIcon />}
            className={classes.logoutButton}
            onClick={handleLogout}
            sx={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              width: "calc(100% - 2rem)",
            }}
          >
            Logout
          </Button>
        </Drawer>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            position: "absolute",
            top: "0.5rem",
            left: "2rem",
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
