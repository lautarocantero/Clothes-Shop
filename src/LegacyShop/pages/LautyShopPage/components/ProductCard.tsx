import { Box, Typography } from "@mui/material";
import type { productType } from "../types/productTypes";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, title, price, type, size, imagesUrl }: productType) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detalle-producto/?id=${id}`);
  }

  return (
    <Box
      sx={{
        animation: "fadeIn 1s",
        backgroundColor: "background.paper",
        boxShadow: 2,
        cursor: "pointer",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: 'auto',
        minWidth: { xs: "45%", md: '40%' },
        width: { xs: "90%", md: '100%' },
        overflow: 'hidden'
      }}
      className="animate__animated animate__fadeIn"
      onClick={handleNavigate}
    >
      {/* Imagen */}
      <Box sx={{ width: "100%", height: 420, overflow: 'hidden', display: "flex", justifyContent: "center" }}>
        <img
          src={imagesUrl}
          alt={`${id}_photo`}
          style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 4 }}
        />
      </Box>

      {/* Info del producto */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2" textAlign="center" fontWeight={500}>
          {title}
        </Typography>
        <Typography variant="caption" textAlign="center" display="block">
          ${price}
        </Typography>
        <Typography variant="caption" textAlign="center" display="block">
          {size} - {type}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
