import { Navigate, Route, Routes } from "react-router-dom"
import LautyRoutes from "../LautyShop/routes/LautyRoutes";
import AuthRoutes from "../auth/routes/AuthRoutes";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, type RootState } from "../store/auth";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/firebase";
import { useEffect } from "react";
import { CheckingAuth } from "../ui";
import PublicRoutes from "../public/routes/PublicRoutes";
import ProductDetailPage from "../LautyShop/pages/Product/ProductDetailPage";
import LautyShopPage from "../LautyShop/pages/LautyShopPage/LautyShopPage";

const AppRouther = () => {
  const status = useSelector((state: RootState) => state?.auth?.status);
  const dispatch = useDispatch();  

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user) => {
      if(!user) return dispatch(logout())

      const {uid, email,displayName, photoURL} = user;
      dispatch(login({uid,email,displayName,photoURL}))
    })
  }, [])

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
  <Routes>
      <Route path="/detalle-producto/*" element={<ProductDetailPage />} />
      <Route path="/" element={<LautyShopPage />} />

      {status === 'authenticated' ? (
        <Route path="/*" element={<LautyRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouther;
