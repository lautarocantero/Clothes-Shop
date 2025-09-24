import { Navigate, Route, Routes } from "react-router-dom"
import LautyShopPage from "../pages/LautyShopPage/LautyShopPage"
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import PaymentMethodPage from "../pages/PaymentMethod/PaymentMethod";

const LegacyRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<LautyShopPage/>} />
            <Route path={'/detalle-producto/*'} element={<ProductDetailPage/>} />
            <Route path={'/mi-carrito'} element={<ShoppingCart/>} />
            <Route path={'/completar-compra'} element={<PaymentMethodPage/>} />
            <Route path={'/*'} element={<Navigate to='/' />} />
        </Routes>
    )
}

export default LegacyRoutes;
