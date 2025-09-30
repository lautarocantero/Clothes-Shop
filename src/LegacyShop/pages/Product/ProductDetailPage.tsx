import { Box, Button, GridLegacy as Grid, TextField, Typography, Link, Snackbar, IconButton, type SnackbarCloseReason, Slide } from "@mui/material"
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import LegacyShopLayout from "../../layout/LegacyShopLayout";
import { useDispatch, useSelector } from "react-redux";
import queryString from  "query-string";
import { startLoadingClothes, type RootState } from "../../../store/shop";
import { startAddToCart } from "../../../store/user/thunks";
import type { AppDispatch } from "../../../store/user";


const ProductDetailPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { id } = queryString.parse(location.search) as {
        id?: string;
        };
    const { clothes, cart, status } = useSelector((state: RootState) => ({
        clothes: state.shop.clothes,
        cart: state.user.cart,
        status: state.auth.status,
    }));
    const clothesData = useMemo(() => {
        return clothes?.find((c) => c.id === id);
    }, [clothes, id]);  
    const {imagesUrl,price,size,title} = clothesData ?? {};
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

  const handleAddToCart = () => {
    if(!clothesData) return;
    if(status === 'not-authenticated') {
        navigate('/auth/register');
        return;
    }
    if(!cart?.find(c => c?.id === clothesData?.id)) {
        dispatch(startAddToCart(clothesData) as any);
        setOpen(true);
    }
  }

  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  

  useEffect(() => {
    if (!clothes || clothes.length === 0) {
        dispatch(startLoadingClothes() as any);
    }
    }, [clothes, dispatch]);

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      </IconButton>
    </>
  );

  return (
    <LegacyShopLayout>
        <Snackbar
            open={open}
            autoHideDuration={1000}
            message={
                <span>
                <span
                    className="material-symbols-outlined"
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                >
                    shopping_cart
                </span>
                Added to cart
                </span>
            }
            action={action}
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
            />
        <Box 
            sx={{
                borderRadius: '5px', 
                color: theme => theme?.custom?.accent,
                margin: { xs:'100px auto 50px', md: '120px auto 50px'},
                padding: '25px', 
                width: {xs: '100%', md: '75%'},
            }}>
            <Grid
                container
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr' },
                    gridTemplateAreas: {
                    xs: `"imagen""info""extra"`,
                    sm: `"imagen info""extra  info"`},
                    gap: 2,
                }}>
                <Grid
                    item
                    sx={{
                        gridArea: 'imagen',
                        maxHeight: {xs: '300px', md: '500px'},
                        height: {xs: '300px', md: 'auto'},
                        display: 'flex',
                        justifyContent: 'center',
                        mt: '10px',
                        backgroundColor: theme => theme?.custom?.white,
                        borderRadius: '5px',
                        overflow: 'hidden',
                    }}
                    className="animate__animated animate__fadeIn"
                >
                    <img
                        src={imagesUrl}
                        alt="photo"
                        loading="lazy"
                    />
                </Grid>

                <Grid sx={{ gridArea: 'info' }}>
                    <Grid container>
                        <Grid xs={12}>
                            <Typography
                              sx={(theme) => ({
                                fontSize: {
                                  xs: theme.typography.h1.fontSize,
                                  sm: theme.typography.h1.fontSize,
                                },
                                marginTop: "20px",
                              })}
                              component={'h1'}
                            >
                              {title}
                            </Typography>
                            <Typography sx={{fontSize: theme => theme?.typography?.h3?.fontSize, justifySelf: 'end'}}><b>${`${price}`}</b></Typography>
                            {
                              price && (
                              <Typography
                                  sx={{
                                      color: theme => theme?.palette?.primary?.main,
                                      justifySelf: 'end'
                                  }}>
                                      Price without taxes ${`${price - (price * 12 / 100)}`}
                              </Typography>
                              )
                            }
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid sx={{margin: '10px 0px'}} width={'100%'}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: theme => theme?.typography?.body1?.fontSize, gap: 1, }}>
                                    Free shipping for orders over 100.000
                            </Typography>  

                            <Grid display={'flex'} flexDirection={'column'}>
                                <Typography sx={{fontSize: theme => theme?.typography?.body1?.fontSize, marginTop: '20px'}}>
                                    Calculate shipping
                                </Typography>

                                <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
                                    <Grid xs={12} sm={6}>
                                        <TextField
                                            label="E-mail" 
                                            type="text" 
                                            placeholder="0134"
                                            fullWidth
                                            name="postalCode"
                                            value={'1755'}
                                            // onChange={()=> {}}
                                            sx={{ backgroundColor: theme => theme?.custom?.white}}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={6}>
                                        <Button sx={{
                                            backgroundColor: theme => theme?.palette?.primary?.main,
                                            color: theme => theme?.custom?.white,
                                            width: '100%',
                                            height: '100%'
                                        }}>
                                            CALCULATE
                                        </Button>
                                    </Grid>
                                </Grid>
                                
                                <Link 
                                    component={LinkRouter} 
                                    to={'https://www.correoargentino.com.ar/formularios/cpa'} 
                                    target="_blank"
                                    sx={{ margin: '0.5em 0em'}}
                                >
                                    <Typography>I don't know my zip code</Typography>
                                </Link>
                            </Grid> 
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid xs={12}>
                            <Typography sx={{fontSize: theme => theme?.typography?.body1?.fontSize}}>Size: <b>{size?.toLocaleUpperCase()}</b></Typography>
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid sx={{ width: {xs: '80%', md: '100%', margin: '0px auto'}}}>
                            <Button 
                                onClick={handleAddToCart}
                                sx={{ 
                                    backgroundColor: theme => theme?.palette?.primary?.main, 
                                    color: theme => theme?.custom?.white,
                                    fontSize: theme => theme?.typography?.h5?.fontSize,
                                    width: '100%'
                                }}>
                                Buy
                            </Button>
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid>
                            <Typography 
                                sx={{  
                                    color: theme => theme?.custom?.lightGray,
                                    textDecoration: 'underline',
                                    fontSize: theme => theme?.typography?.h5?.fontSize,
                                    margin: '10px 0px' 
                                }}
                                >
                                See payment methods
                            </Typography>
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid container display={'flex'} flexDirection={'column'} gap={'15px'}> 
                            <Grid container display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Grid xs={1}>
                                  <img
                                    src={'/assets/Icons/security.png'}
                                    alt="photo"
                                    style={{width: '100%', margin: '0 auto' }}
                                    loading="lazy"
                                  />
                                </Grid>
                                <Grid xs={11}>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>
                                        Protected purchase
                                    </Typography>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>your data is taken care of throughout the purchase.</Typography>
                                </Grid>
                            </Grid>
                            <Grid container display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Grid xs={1}>
                                  <img
                                    src={'/assets/Icons/refound.png'}
                                    alt="photo"
                                    style={{width: '100%', margin: '0 auto' }}
                                    loading="lazy"
                                  />
                                </Grid>
                                <Grid xs={11}>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>
                                        Changes and returns
                                    </Typography>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>If you don't like it , you can exchange it for another or return it.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                </Grid>
        </Box>
    </LegacyShopLayout>

  )
}

export default ProductDetailPage
                

