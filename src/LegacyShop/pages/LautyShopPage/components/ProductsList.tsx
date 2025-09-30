import {
  Box,
  Typography,
  GridLegacy as Grid,
  TextField,
} from "@mui/material";
import { startLoadingClothes, type RootState } from "../../../../store/shop";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import queryString from "query-string";
import type { productType } from "../types/productTypes";


const ProductsExhibitor = React.memo(
  ({ products }: { products: productType[] }) => {
    return (
      <Grid item xs={12}>
        {products?.length === 0 ? (
          <Typography variant="h6" sx={{ mt: 4 }}>
            No products available
          </Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {products?.map((product: productType) => (
              <Grid item xs={12} sm={6} md={6} key={product.id}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    );
  }
);

const LoaderClothes = ({
  isLoadingClothes,
  clothes,
}: {
  isLoadingClothes: boolean;
  clothes: productType[];
}) => {
  if (isLoadingClothes) {
    return (
      <Box
        sx={{
          margin: "50px auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <ProductsExhibitor products={clothes} />;
};

const ProductsList = () => {
  const location = useLocation();
  const { type, size } = queryString.parse(location.search) as {
    type?: string;
    size?: string;
  };

  const dispatch = useDispatch();
  const { clothes, isLoadingClothes } = useSelector((state: RootState) => state.shop);
  
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(startLoadingClothes({ type, size, searchParams: searchTerm }) as any);
    }, 400);

    return () => clearTimeout(timeout);
  }, [dispatch, type, size, searchTerm]);

  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        marginTop: { xs: "50px", sm: "0px" },
      }}
    >
      <Grid container spacing={2} maxWidth="lg">
        <Grid item xs={12} sx={{ justifyContent: "end" }}>
          <Box
            component={"div"}
            sx={{
              backgroundColor: (theme) => theme?.palette?.primary?.main,
              padding: { xs: 2, md: 1 },
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"end"}
          >
            <Box
              component={"form"}
              sx={{
                width: { xs: "100%", md: "20%" },
                backgroundColor: (theme) => theme?.custom?.white,
                borderRadius: "1%",
              }}
            >
              <TextField
                fullWidth
                name="Buscador"
                onChange={(e) => setSearchTerm(e?.target?.value)}
                placeholder="Pants..."
                type="text"
                label="Search Bar"
              />
            </Box>
          </Box>
        </Grid>
        <LoaderClothes isLoadingClothes={isLoadingClothes} clothes={clothes} />
      </Grid>
    </Box>
  );
};

export default ProductsList;
