import { Navigate, Route, Routes } from "react-router-dom"
import LautyShopPage from "../pages/LautyShopPage/LautyShopPage"
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";

const LautyRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<LautyShopPage/>} />
            <Route path={'/detalle-producto/*'} element={<ProductDetailPage/>} />
            <Route path={'/mi-carrito'} element={<ShoppingCart/>} />
            <Route path={'/*'} element={<Navigate to='/' />} />
        </Routes>
    )
}

export default LautyRoutes;
