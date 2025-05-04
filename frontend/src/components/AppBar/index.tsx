import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PlayingCards from '../../assets/playing_cards.svg';
import { useNavigate } from 'react-router-dom';

const pages = ['Cards','Produtos', 'Blog'];
const settings = ['Perfil', 'Anunciar produto', 'Logout'];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [loggedUser, setLoggedUser] = React.useState<{ id: string; name: string } | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setLoggedUser(JSON.parse(stored));
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedUser(null);
    handleCloseUserMenu();
    navigate('/');
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={PlayingCards} alt="Logo" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto Condensed',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UniTCG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    if (page === 'Cards') navigate('/main');
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  if (page === 'Cards') navigate('/main');
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {loggedUser ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>{loggedUser.name[0].toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    if (setting === 'Perfil') {
                      return (
                        <MenuItem
                          key={setting}
                          onClick={() => {
                            handleCloseUserMenu();
                            navigate('/profile');
                          }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    }
                    if (setting === 'Anunciar produto') {
                      return (
                        <MenuItem
                          key={setting}
                          onClick={() => {
                            handleCloseUserMenu();
                            navigate('/lucra');
                          }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    }
                    if (setting === 'Logout') {
                      return (
                        <MenuItem key={setting} onClick={handleLogout}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </Menu>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
