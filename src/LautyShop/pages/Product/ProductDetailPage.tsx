import { Box, Button, GridLegacy as Grid, TextField, Typography, Link } from "@mui/material"
import { Link as LinkRouter } from "react-router-dom";
import { useEffect } from "react";
import LautyShopLayout from "../../layout/LautyShopLayout";
import { useDispatch, useSelector } from "react-redux";
import queryString from  "query-string";
import { startLoadingClothes, type RootState } from "../../../store/shop";
import { startAddToCart } from "../../../store/users/thunks";


const ProductDetailPage = () => {

  const { id } = queryString.parse(location.search) as {
      id?: string;
    };
  const { clothes } = useSelector((state: RootState) => state.shop);
  const { cart } = useSelector((state: RootState) => state.user);
  const clothesData = clothes?.find((c) => c.id === id );
  const {imagesUrl,price,size,stock,title,type} = clothesData ?? {};
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if(!clothesData) return;
    if(!cart?.find(c => c?.id === clothesData?.id))
        dispatch(startAddToCart(clothesData) as any);
  }

  useEffect(() => {
      dispatch(startLoadingClothes() as any);
  }, [dispatch]);

  return (
    <LautyShopLayout>
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
                        height: {xs: '300px', md: 'auto'},
                        display: 'flex',
                        justifyContent: 'center',
                        mt: '10px',
                        backgroundColor: theme => theme?.custom?.white,
                        borderRadius: '5px',
                    }}
                    className="animate__animated animate__fadeIn"
                >
                    <img
                    src={imagesUrl}
                    alt="photo"
                    />
                </Grid>

                {/* Grid 2: Info del producto */}
                <Grid item sx={{ gridArea: 'info' }}>
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
                                      color: theme => theme?.palette?.secondary?.main,
                                      justifySelf: 'end'
                                  }}>
                                      Precio sin impuestos ${`${price - (price * 12 / 100)}`}
                              </Typography>
                              )
                            }
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid sx={{margin: '10px 0px'}} width={'100%'}>
                            <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: theme => theme?.typography?.body1?.fontSize, gap: 1, }}>
                                {/* <LocalShippingIcon sx={{ fontSize: '1.2em', mr: 1 }} /> */}
                                    Envio gratis superando los 100.000
                            </Typography>  

                            <Grid display={'flex'} flexDirection={'column'}>
                                <Typography sx={{fontSize: theme => theme?.typography?.body1?.fontSize, marginTop: '20px'}}>
                                    Calcular envio
                                </Typography>

                                <Grid display={'flex'} flexDirection={'row'} gap={'10px'}>
                                    <Grid xs={12} sm={6}>
                                        <TextField
                                            // label="correo" 
                                            type="number" 
                                            placeholder="0134"
                                            fullWidth
                                            name="postalCode"
                                            value={'1722'}
                                            onChange={()=> {}}
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
                                            CALCULAR
                                        </Button>
                                    </Grid>
                                </Grid>
                                
                                <Link 
                                    component={LinkRouter} 
                                    to={'https://www.correoargentino.com.ar/formularios/cpa'} 
                                    target="_blank"
                                    sx={{ margin: '0.5em 0em'}}
                                >
                                    <Typography>No sé mi codigo postal</Typography>
                                </Link>
                            </Grid> 
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid xs={12}>
                            <Typography sx={{fontSize: theme => theme?.typography?.body1?.fontSize}}>Talle: <b>{size?.toLocaleUpperCase()}</b></Typography>
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
                                Comprar
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
                                Ver medios de pago
                            </Typography>
                        </Grid>
                        <hr style={{ width: '100%'}}/>
                        <Grid container display={'flex'} flexDirection={'column'} gap={'15px'}> 
                            <Grid container display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Grid item xs={1}>
                                  <img
                                    src={'/public/assets/Icons/security.png'}
                                    alt="photo"
                                    style={{width: '100%', margin: '0 auto' }}
                                  />
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>
                                        Compra protegida
                                    </Typography>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>Tus datos cuidados durante toda la compra.</Typography>
                                </Grid>
                            </Grid>
                            <Grid container display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Grid item xs={1}>
                                  <img
                                    src={'/public/assets/Icons/refound.png'}
                                    alt="photo"
                                    style={{width: '100%', margin: '0 auto' }}
                                  />
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>
                                        Cambios y devoluciones
                                    </Typography>
                                    <Typography sx={{ fontSize: theme => theme?.typography?.body1?.fontSize}}>Si no te gusta, podés cambiarlo por otro o devolverlo.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                </Grid>
        </Box>
    </LautyShopLayout>

  )
}

export default ProductDetailPage
                
