import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../../actions/userAction';
import {toast} from "react-toastify"
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const pages = ['Products', 'About', 'Help'];
const links=["/products","/about","/help"]

export default function PrimarySearchAppBar() {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [keyword, setkeyword] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const {  isAuthentication, user } = useSelector(
    (state) => state.user
  );
  function hendellogout(){
    try {
      dispatch(logout());
      toast.success("succesfully logout", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // navigate("/products");
    } catch (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  React.useEffect(()=>{

  },[])
  function hendelkey(e){
    if (e.key === 'Enter') {
      // setkeyword(searchText);
      navigate(`/products/${keyword}`);
    }
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      {isAuthentication?<MenuItem onClick={handleMenuClose}><Link to="/account">Profile</Link></MenuItem>:null}
      {isAuthentication?<MenuItem onClick={handleMenuClose}><Link to="/admin/dashboard">Dashboard</Link></MenuItem>:null}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      
        <Link to={isAuthentication?null:'/login'}><IconButton size="large" aria-label="show 4 new mails" color="inherit">
          
            {/* <MailIcon /> */}
            {!isAuthentication?(<LoginIcon  />):<LogoutIcon onClick={hendellogout}/>}
          
        </IconButton> </Link>
        <Link style={{textDecoration:"none"}} to={isAuthentication?null:'/login'}>{isAuthentication?<p onClick={hendellogout}>Logout</p>:<p>Login</p>}</Link>
        
      </MenuItem>
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {isAuthentication?<img
                  style={{borderRadius:"100%",height:"40px",width:"40px"}}
                  src={user?user.avatar.url:null}
                  alt="Avatar"
                  // className={styles.avatarImage}
                />:<AccountCircle />}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page,index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration:"none"}} to={links[index]}><Typography textAlign="center">{page}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to="/" style={{ textDecoration: 'none', color:"tomato", }}>
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                backgroundColor: 'blue',
              }}
            >
              CampusMart
            </Typography> */}
            <h2 style={{paddingRight:"10px"}}>CampusMart</h2>
            {/* <Typography>Cam</Typography> */}
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Search>
            <SearchIconWrapper >
              <SearchIcon  />
            </SearchIconWrapper>
            
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setkeyword(e.target.value)}
                onKeyPress={hendelkey}
              />
            
          </Search>

          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (
              <>
              <Link style={{textDecoration:"none"}} to={links[index]}><Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
              </Link>
              </>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {!isAuthentication?<Button onClick={()=>navigate("/login")} sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>:<Button onClick={hendellogout}  sx={{ my: 2, color: 'white', display: 'block',   }}>Logout</Button>}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              {isAuthentication?<img
                  style={{borderRadius:"100%",height:"40px",width:"40px"}}
                  src={user?user.avatar.url:null}
                  alt="Avatar"
                  // className={styles.avatarImage}
                />:<AccountCircle />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
    <Search style={{border:"2px black",color:"red"}}>
            <SearchIconWrapper >
              <SearchIcon  />
            </SearchIconWrapper>
            
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setkeyword(e.target.value)}
                onKeyPress={hendelkey}
              />
            
          </Search>
    </Box>
    </div>
  );
}
