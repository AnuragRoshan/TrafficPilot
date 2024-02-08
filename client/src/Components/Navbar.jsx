import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useSelector } from "react-redux";
import { selectUserStatus, selectUsers } from "../Redux/Features/userSlice";
import axios from "axios";
import { api } from "../Data/env";

const pages = ["Home", "Profile", "Assessment"]; // Updated the "Assesment" to "Assessment"
const settings = ["Profile", "Result", "License"];

function ResponsiveAppBar() {
  const userStatus = useSelector(selectUserStatus);
  const user = useSelector(selectUsers);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // console.log(user.name);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${api}logout`, null, {
        withCredentials: true, // include cookies in the request
      });

      if (response.status === 200) {
        // Logout successful
        console.log("User logged out");
        window.location.href = "/";
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link} // Use Link component for routing
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            TrafficPilot
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={`/${page.toLowerCase()}`}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link} // Use Link component for routing
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            TrafficPilot
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => {
              // Check if the page is "Assessment" or "Profile" and userStatus is false
              if (
                (page === "Assessment" || page === "Profile") &&
                !userStatus
              ) {
                return null; // Skip rendering this page
              }
              // Otherwise, render the button
              return (
                <Button
                  key={page}
                  component={Link} // Use Link component for routing
                  to={`/${page.toLowerCase()}`}
                  onClick={handleCloseNavMenu}
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: 700,
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          {userStatus ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, padding: "1rem" }}
                  >
                    <i
                      class="fa-regular fa-user"
                      style={{
                        fontSize: "1.5rem",
                      }}
                    ></i>
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
                  <MenuItem>
                    <Button
                      textAlign="center"
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "black",
                        display: "block",
                      }}
                    >
                      {user.name}
                    </Button>
                  </MenuItem>
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Button
                        component={Link} // Use Link component for routing
                        to={`/${setting.toLowerCase()}`}
                        textAlign="center"
                        sx={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "black",
                          display: "block",
                        }}
                      >
                        {setting}
                      </Button>
                    </MenuItem>
                  ))}
                  {/* For logout make seperate handleclick */}
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      handleLogout();
                    }}
                  >
                    <Button
                      textAlign="center"
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "black",
                        display: "block",
                      }}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  // backgroundColor: "rgb(0, 195, 255)",
                  border: "1px solid #b3b3b3",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                  // fontWeight: 600,
                }}
                to={"/login"}
              >
                {" "}
                Login
              </Link>{" "}
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
