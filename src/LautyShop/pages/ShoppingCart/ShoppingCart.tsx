import { Box, Button, GridLegacy as Grid, Typography } from "@mui/material";
import LautyShopLayout from "../../layout/LautyShopLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startBuyCart, startLoadingCart, startRemoveFromCart, type RootState } from "../../../store/users";
import { type RootState as authRoot} from '../../../store/auth';
import type { productType } from "../LautyShopPage/types/productTypes";

interface ProductsExhibitorProps {
  products: productType[];
  onRemoveProduct: (args: { productId: string; cart: productType[] }) => void;
}


const ProductsExhibitor = ({ products, onRemoveProduct }: ProductsExhibitorProps) => {
  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <Grid item>
      {products.map(({ id, imagesUrl, title, price, stock, size }) => (
        <Grid
          key={id}
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{
            padding: 2,
            margin: '0 auto',
            minHeight: {xs:'none', md:'300px'},
            maxHeight: {xs:'none', md:'300px'},
            borderBottom: '1px dashed #ccc',
            boxSizing: 'border-box',
          }}
        >
          <Grid item xs={3} sm={2}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 1,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={imagesUrl}
                alt={title ?? 'Producto'}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={9}
            sm={10}
            container
            direction="column"
            sx={{
              display: 'flex',
              alignSelf: 'flex-start',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={(theme) => ({
                textAlign: 'left',
                fontSize: {
                  xs: theme.typography.h6.fontSize,
                  md: theme.typography.h3.fontSize,
                },
              })}
            >
              {title}
            </Typography>
            <Button
              onClick={() => onRemoveProduct({productId: id, cart: products})}
              sx={{
                alignSelf: 'flex-start',
                border: '1px solid',
                borderColor: theme => theme?.palette?.primary?.main,
                color:theme => theme?.palette?.primary?.main,
                fontSize: theme => theme?.typography?.caption?.fontSize,
              }}
            >
              Eliminar
            </Button>

            <Box/>

            <Typography
              variant="subtitle1"
              sx={{
                alignSelf: 'flex-end',
              }}
            >
              <strong>${price}</strong>
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};


const calculateTotalAmount = (cart: productType[]) => {
  if (!Array.isArray(cart)) return 0;

  return cart?.reduce((total, product) => {
    return total + Number(product?.price ?? 0);
  }, 0);
};

interface CartFooterProps {
  cart: any;
  handleBuyCart: () => void;
}

const CartFooter = ({ cart, handleBuyCart }: CartFooterProps) => {
  if (!cart || cart?.length === 0) return null;

  const total = calculateTotalAmount(cart);

  return (
    <Grid item mt={{xs:'20', md:'5'}}>
      <Grid item xs={12} display={'flex'} flexDirection={'row'} justifyContent={'end'} mt={3} width={'95%'}>
        <Typography component={'span'} sx={{ backgroundColor: theme => theme?.custom?.lightGray, borderRadius: '5%', color: theme => theme?.custom?.white, padding: 1}}>Total: <b>${total}</b></Typography>
      </Grid>

      <Grid item xs={12} display={'flex'} flexDirection={'row'} justifyContent={'end'} mt={3} width={'95%'}>
        <Button  
          onClick={handleBuyCart}
          sx={{ backgroundColor: theme => theme?.palette?.primary?.main, color: theme => theme?.custom?.white, padding: 1.5}}>
          Comprar
        </Button>
      </Grid>
    </Grid>
  );
};

const ShoppingCartPage = () => {

  const { cart } = useSelector((state: RootState) => state.user);
  const { id } = useSelector((state: authRoot) => state.auth);

  const dispatch = useDispatch();

  const removeFromCart = ({productId, cart}: {productId:string, cart: productType[]} ) => {
    const productToRemove = cart?.filter((c) => c?.id !== productId);
    if (!productToRemove) return;
    dispatch(startRemoveFromCart(productToRemove) as any)
  }

  const handleBuyCart = async() => {
    const response = await dispatch(startBuyCart() as any);
    if(response){
      alert('Se ha realizado la compra!');
      return;
    }
    alert('Ocurrio un error en el proceso de compra');
  }
  
    useEffect(() => {
      if (!id) return; 
      dispatch(startLoadingCart({id} as any) as any);
    }, [dispatch, id]);
  

  return (
    <LautyShopLayout>
      <Box
        component={"div"}
        sx={{ margin: "110px auto 50px", width: { xs: "95%", md: "60%" } }}
      >
        <Grid container display={"flex"}flexDirection={"column"}>
          <Grid item
            sx={{
              backgroundColor: (theme) => theme?.palette?.primary?.main,
              color: (theme) => theme?.custom?.white,
              fontStyle: "bold",
              p: 2,
            }}
          >
            <Typography
              component={"h2"}
              className="animate__animated animate__fadeIn"
              sx={{
                animation: "fadeIn 1s",
                fontStyle: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <strong>Mi carrito</strong>
            </Typography>
          </Grid>
          <Grid item>
            <ProductsExhibitor products={cart} onRemoveProduct={removeFromCart} />
          </Grid>
          <Grid item>
            <CartFooter cart={cart} handleBuyCart={handleBuyCart}/>
          </Grid>
        </Grid>
      </Box>
    </LautyShopLayout>
  );
};

export default ShoppingCartPage;
