import { Box, Typography, GridLegacy as Grid } from "@mui/material"
import ProductsFilter from "./components/ProductsFilter"
import ProductsList from "./components/ProductsList"
import LegacyShopLayout from "../../layout/LegacyShopLayout"

const LautyShopPage = () => {

  return (
    <LegacyShopLayout>
      <Box sx={{ margin: 'auto',  pt: { xs: 10, sm: 8 } }}>
        <Typography
          variant="h1"
          align="center"
          letterSpacing={2}
          sx={{
            color: theme => theme?.palette?.primary?.main,
            fontSize: theme => theme?.typography?.h1?.fontSize,
            textDecoration: 'underline',
            margin: '20px 0px',
          }}
        >
          <Typography 
            component="span" 
            sx={{ color: theme => theme?.palette?.primary?.main, fontSize: theme => theme?.typography?.h1?.fontSize }}
          >
            Legacy Shop
          </Typography>
        </Typography>
        <Grid container sx={{ p: 2  , width: '100%' }}>
          <Grid xs={12} sm={6} md={2}>
            <ProductsFilter />
          </Grid>
          <Grid xs={12} sm={6} md={10}>
            <ProductsList />
          </Grid>
        </Grid>
      </Box>
    </LegacyShopLayout>
  )
}

export default LautyShopPage
