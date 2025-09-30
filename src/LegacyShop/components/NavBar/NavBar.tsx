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
import { startLogout, type RootState as AuthRootState } from "../../../store/auth";
import type { AppBarColor, NavBarLink } from "./types";

interface NavBarProps {
  links: NavBarLink[];
  color?: AppBarColor;
}

const NavBar = ({ links = [], color = 'primary' }: NavBarProps) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleNavigate = useNavigate();

  const { status, name } = useSelector((state: AuthRootState) => state?.auth);

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
                sx={{
                  fontSize: theme => theme?.typography?.body1?.fontSize,
                  textDecoration: 'none',
                  width: '100%',
                  fontWeight: 200,
                  color: theme => theme.palette?.secondary?.main,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: theme => theme.palette?.secondary?.main,
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

  const FloatingMenuLinks = () => {
    if (status === 'authenticated') {
      return (
        <>
          <MenuItem onClick={onHandleShoppingCart}>My cart</MenuItem>
          <MenuItem onClick={onLogout}>Sign out</MenuItem>
        </>
      );
    }

    return (
      <>
        <MenuItem onClick={onRegister}>Sign up</MenuItem>
        <MenuItem onClick={() => handleNavigate('/auth/login')}>Login</MenuItem>
      </>
    );
  };

  const FloatingMenu = () => {
    return (
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
          <FloatingMenuLinks />
        </Menu>
    )
  }

const DesktopMenu = () => {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{
          flexGrow: 1,
          display: { xs: 'none', sm: 'flex' },
        }}
      >
        <Grid xs={4} />
        <Grid
          item
          xs={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <DesktopMenuLinks links={links} />
        </Grid>

        <Grid
          item
          xs={4}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography sx={{ color: theme => theme?.palette?.secondary?.main, maxWidth: '200px',overflow: 'hidden',whiteSpace: 'nowrap',textOverflow: 'ellipsis'}}>{name || ''}</Typography>
          <IconButton
            onMouseEnter={handleMouseEnter}
            sx={{
              colour: theme => theme?.custom?.white,
              fontSize: theme => theme?.typography?.h4?.fontSize,
            }}
          >
            <Typography sx={{color: theme => theme?.custom?.white}}>
              <span className="material-symbols-outlined">account_circle</span>
            </Typography>
          </IconButton>
        </Grid>
      </Grid>
      <FloatingMenu />
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
        {
          (status === 'authenticated') ? 
            (<MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>) : 
            (<MenuItem onClick={() => handleNavigate('/auth/login')}>Iniciar sesión</MenuItem>)
        }
      </Menu>
    );
  };

  return (
    <>
      <AppBar color={color}>
        <Toolbar>
          <Grid
            container
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              alignContent: { xs: 'start', sm: 'none' },
            }}
          >
            <Grid>
              <IconButton
                aria-label="Abrir menú de usuario"
                sx={{ display: { xs: 'block', sm: 'none' }, color: theme => theme?.custom?.white }}
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="material-symbols-outlined">menu</span>
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
