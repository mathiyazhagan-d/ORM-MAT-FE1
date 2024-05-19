import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Link ,useHistory} from "react-router-dom";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.currentUser.userInfo);
const history=useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/")
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/profile">Profile</MenuItem>
      {userInfo && userInfo.isAdmin && (
        <>
          <MenuItem component={Link} to="/dashboard">Dashboard</MenuItem>
        </>
      )}
      <MenuItem onClick={handleLogout} className="text-danger">Logout</MenuItem>
    </Menu>
  );

  return (
    <AppBar color="default" style={{marginBottom:"50px"}}>
      <Toolbar style={{ justifyContent: 'space-between', padding: '0 20px' }}>
        <Typography variant="h6" noWrap component={Link} to="/" style={{ textDecoration: 'none', color: 'black', marginRight: '2rem' }}>
          ORM-MAT
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/drinks">Drinks</Button>
          {!userInfo ? (
            <>
              <Button color="inherit" component={Link} to="/register?redirect=/">Register</Button>
              <Button color="inherit" component={Link} to="/login">Login</Button>
            </>
          ) : null}
          <IconButton component={Link} to="/cart" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          {userInfo && (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Header;
