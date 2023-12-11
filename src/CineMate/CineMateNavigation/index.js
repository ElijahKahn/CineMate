import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import "./index.css";
import CineMateLogo from "./CineMateLogo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from 'react-router-dom';
import * as client from "../users/client"


const pages = ["Home", "Movies", "Series", "Search"];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); 
  const settings = isLoggedIn
    ? ["Profile", "My Watchlist", "Logout"]
    : ["Profile", "My Watchlist", "Sign In"];

  const { courseId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const signout = async () => {
    await client.signout();
    navigate("/CineMate/Home");
  };
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === 'Sign In') {
      navigate('/CineMate/SignIn');
    }
    if (setting === 'Profile') {
      navigate('/CineMate/Profile');
    }

    if (setting === 'My Watchlist') {
      navigate('/CineMate/Watchlist');
    }

    if (setting == "Logout") {
      signout();
    }
  };

  

  return (
    <div className="main-nav">
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.20)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={CineMateLogo}
              alt="CineMate Logo"
              style={{ height: "40px", marginRight: "8px" }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    key={page}
                    to={`/CineMate/${page}`}
                    className={`nav-link ${
                      pathname.includes(page) && "active"
                    }`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page}
                  to={`/CineMate/${page}`}
                  className={`nav-link ${pathname.includes(page) && "active"}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontWeight: 1000,
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* edit logo here, alt will ne there name*/}
                  {/* <CgProfile /> */}
                  <Avatar alt="Profile" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
