// Updated Header.jsx with MUI Menu fix

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useValue } from '../context/ContextProvider';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'report here', path: '/add-report' },
  { name: 'Reports', path: '/reports' }
];

function Header() {
  const { state, dispatch } = useValue();
  const { auth } = state;
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#31572c' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FilterHdrIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          
          </Typography>

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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {[
                ...pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to={page.path}
                      sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                )),
                ...(!auth.user
                  ? [
                      <MenuItem key="login" onClick={handleCloseNavMenu}>
                        <Typography
                          component={Link}
                          to="/login"
                          sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                        >
                          Login
                        </Typography>
                      </MenuItem>,
                      <MenuItem key="register" onClick={handleCloseNavMenu}>
                        <Typography
                          component={Link}
                          to="/register"
                          sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                        >
                          Register
                        </Typography>
                      </MenuItem>,
                    ]
                  : [
                      auth.user.role === 'admin' && (
                        <MenuItem key="admin-reports" onClick={handleCloseNavMenu}>
                          <Typography
                            component={Link}
                            to="/admin-reports"
                            sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
                          >
                            Admin Reports
                          </Typography>
                        </MenuItem>
                      ),
                      <MenuItem key="logout" onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                        <Typography sx={{ textAlign: 'center', color: 'inherit' }}>
                          Logout
                        </Typography>
                      </MenuItem>,
                    ])
              ]}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
            {!auth.user ? (
              <>
                <Button component={Link} to="/login" sx={{ my: 2, color: 'white' }}>
                  Login
                </Button>
                <Button component={Link} to="/register" sx={{ my: 2, color: 'white' }}>
                  Register
                </Button>
              </>
            ) : (
              <>
                {auth.user.role === 'admin' && (
                  <Button component={Link} to="/admin-reports" sx={{ my: 2, color: 'white' }}>
                    Admin Reports
                  </Button>
                )}
                <Button onClick={handleLogout} sx={{ my: 2, color: 'white' }}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;