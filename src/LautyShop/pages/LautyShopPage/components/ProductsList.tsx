import { Box, Typography, GridLegacy as Grid, TextField } from "@mui/material";
import { startLoadingClothes, type RootState } from "../../../../store/shop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import queryString from "query-string";
import type { productType } from "../types/productTypes";
import { width } from "@mui/system";

const filterClothes = (
  clothes: productType[],
  filterType?: string | null | undefined,
  filterSize?: string | null | undefined,
  search?: string | null | undefined,
): productType[] => {
  return clothes.filter((garment) => {
    const matchesType = !filterType || garment.type?.toLowerCase() === filterType.toLowerCase();
    const matchesSize = !filterSize || garment.size?.toLowerCase() === filterSize.toLowerCase();
    const matchesSearch =
      !search || garment.title?.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSize && matchesSearch;
  });
};

const ProductsList = () => {
  const location = useLocation();
  const { type, size } = queryString.parse(location.search) as {
    type?: string;
    size?: string;
  };
  const dispatch = useDispatch();
  const { clothes } = useSelector((state: RootState) => state.shop);
  const [searchParams, setSearchParams] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return filterClothes(clothes?? [], type, size,searchParams);
  }, [type, size,searchParams, clothes]);

  useEffect(() => {
    dispatch(startLoadingClothes() as any);
  }, [dispatch]);

  return (
    <Box
      sx={{
        margin: 'auto',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        marginTop: { xs: '50px', sm: '0px' },
      }}
    >
      <Grid container spacing={2} maxWidth="lg">
        <Grid item xs={12} sx={{justifyContent:'end'}}>
          <Box component={'div'} sx={{ backgroundColor: theme => theme?.palette?.primary?.main, padding:{ xs: 2 ,md: 1} }} display={'flex'} flexDirection={'row'} justifyContent={'end'}>
            <Box component={'form'} sx={{ width: { xs: '100%' ,md: '20%'}, backgroundColor: theme => theme?.custom?.white, borderRadius: '1%' }}>
              <TextField
                fullWidth
                name='Buscador'
                onChange={(e) => setSearchParams(e?.target?.value)}
                placeholder='Remera...'
                type='text'
                label='Buscador'
                />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {filteredProducts.length === 0 ? (
            <Typography variant="h6" sx={{ mt: 4 }}>
              No hay productos disponibles.
            </Typography>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={6} key={product.id}>
                  <ProductCard {...product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsList;
