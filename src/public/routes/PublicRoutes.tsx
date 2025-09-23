import { Route, Routes } from "react-router-dom";
import ProductDetailPage from "../../LautyShop/pages/Product/ProductDetailPage";
import LautyShopPage from "../../LautyShop/pages/LautyShopPage/LautyShopPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<LautyShopPage/>} />
      <Route path={'/tienda'} element={<LautyShopPage/>} />
      <Route path="/detalle-producto/*" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default PublicRoutes;
