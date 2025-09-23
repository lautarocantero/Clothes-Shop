// import { MenuOutlined } from "@mui/icons-material";
// import PersonIcon from '@mui/icons-material/Person';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  GridLegacy as Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkReactRouter, useNavigate } from "react-router-dom";
import { startLogout, type RootState } from "../../../store/auth";
import type { AppBarColor, NavBarLink } from "./types";

interface NavBarProps {
  links: NavBarLink[];
  color?: AppBarColor;
}

const NavBar = ({ links = [], color = 'primary' }: NavBarProps) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleNavigate = useNavigate();

  const { name, status } = useSelector((state: RootState) => state?.auth);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(startLogout() as any);
    handleNavigate('/auth/login');
  };

  const onRegister = () => {
    dispatch(startLogout() as any);
    handleNavigate('/auth/register');
  }

  const onHandleShoppingCart = () => {
    handleNavigate('/mi-carrito')
  }

  const DesktopMenuLinks = ({ links }: { links: NavBarLink[] }) => {
    return (
      <>
        {links?.map((linkObject: NavBarLink) => {
          const linkTo = linkObject?.linkUrl?.startsWith('/')
            ? linkObject.linkUrl
            : `/${linkObject.linkUrl}`;

          return (
            <Grid
              item
              key={crypto.randomUUID()}
              sx={{ margin: { xs: '10px', sm: '0 10px' } }}
            >
              <Link
                component={LinkReactRouter}
                to={linkTo}
                color="inherit"
                sx={{
                  fontSize: theme => theme?.typography?.body1?.fontSize,
                  textDecoration: 'none',
                  width: '100%',
                  fontWeight: 200,
                  '&:hover': {
                    color: theme => theme.custom.white,
                    textDecoration: 'underline',
                  },
                }}
              >
                {linkObject?.linkText}
              </Link>
            </Grid>
          );
        })}
      </>
    );
  };

  const DesktopMenu = () => {
    return (
      <>
        <Grid
          item
          xs={12}
          sm="auto"
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            flexGrow: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <DesktopMenuLinks links={links} />
        </Grid>
        <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <IconButton
            sx={{
              color: theme => theme?.custom?.white,
              fontSize: theme => theme?.typography?.h4?.fontSize,
            }}
            onClick={ () => {handleNavigate('/carrito') }}
          >
            {/* <ShoppingCartIcon /> */}
          </IconButton>
          <IconButton
            onMouseEnter={handleMouseEnter}
            sx={{
              color: theme => theme?.custom?.white,
              fontSize: theme => theme?.typography?.h4?.fontSize,
            }}
          >
            {/* <PersonIcon /> */}
            <Typography>Cuenta</Typography>
          </IconButton>

          <Menu
            open={open}
            onClose={handleMouseLeave}
            MenuListProps={{
              onMouseLeave: handleMouseLeave,
            }}
            sx={{ marginTop: '2.5em'}}
            slotProps={{
          paper: {
            sx: {
              backgroundColor: theme => theme.palette.primary.main,
              color: theme => theme.custom.white,
              borderRadius: 0,
              boxShadow: 'none',
            },
          },
        }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          
          >
            <MenuItem>Hola {name || 'Usuario'}!</MenuItem>
            {
              status === 'authenticated' ? (
                <>
                  <MenuItem onClick={onHandleShoppingCart}>Mi carrito</MenuItem>
                  <MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={onRegister} >Registro</MenuItem>
                  <MenuItem onClick={() => handleNavigate('/auth/login')}>Abrir sesión</MenuItem>
                </>
              )
            }
          </Menu>
        </Grid>
      </>
    );
  };

  const MobileMenu = () => {
    return (
      <Menu
        anchorPosition={{ top: 50, left: 0 }}
        anchorReference="anchorPosition"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }}
        slotProps={{
          paper: {
            sx: {
              width: '80%',
              backgroundColor: theme => theme.palette.primary.main,
              color: theme => theme.custom.white,
              borderRadius: 0,
              boxShadow: 'none',
            },
          },
        }}
      >
        {links?.map((linkObject: NavBarLink) => {
          const linkTo = linkObject?.linkUrl?.startsWith('/')
            ? linkObject.linkUrl
            : `/${linkObject.linkUrl}`;

          return (
            <MenuItem
              key={crypto.randomUUID()}
              component={LinkReactRouter}
              to={linkTo}
              onClick={() => setMobileMenuOpen(false)}
              sx={{ fontSize: theme => theme?.typography?.h5?.fontSize }}
            >
              {linkObject?.linkText}
            </MenuItem>
          );
        })}
        <MenuItem sx={{ fontSize: theme => theme?.typography?.h5?.fontSize }}>
          Hola {name || 'Usuario'}!
        </MenuItem>
        <MenuItem sx={{ fontSize: theme => theme?.typography?.h5?.fontSize }}>
          Perfil
        </MenuItem>
        <MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>
      </Menu>
    );
  };

  return (
    <>
      <AppBar color={color}>
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignContent: { xs: 'end', sm: 'center' },
            }}
          >
            <Grid item>
              <IconButton
                aria-label="Abrir menú de usuario"
                sx={{ display: { xs: 'block', sm: 'none' }, color: theme => theme?.custom?.white }}
                onClick={() => setMobileMenuOpen(true)}
              >
                {/* <MenuOutlined /> */}
              </IconButton>
            </Grid>
            <DesktopMenu />
          </Grid>
        </Toolbar>
      </AppBar>
      <MobileMenu />
    </>
  );
};

NavBar.propTypes = {
  links: PropTypes.array.isRequired,
  color: PropTypes.string,
};

export default NavBar;
