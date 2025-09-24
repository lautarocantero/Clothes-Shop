import { Navigate, Route, Routes } from "react-router-dom"
import LautyRoutes from "../LautyShop/routes/LautyRoutes";
import AuthRoutes from "../auth/routes/AuthRoutes";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, type RootState } from "../store/auth";
import { type RootState as UserRootState } from "../store/users";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/firebase";
import { useEffect } from "react";
import { CheckingAuth } from "../ui";
import ProductDetailPage from "../LautyShop/pages/Product/ProductDetailPage";
import LautyShopPage from "../LautyShop/pages/LautyShopPage/LautyShopPage";
import AdminRoutes from "../admin/routes/AdminRoutes";

const AppRouther = () => {
  const {status} = useSelector((state: RootState) => state?.auth);
  const {rol} = useSelector((state: UserRootState) => state?.user);
  const dispatch = useDispatch();  

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
    if (!user) {
      dispatch(logout());
      return;
    }

    const { uid, email, displayName, photoURL } = user;
    dispatch(login({ uid, email, displayName, photoURL }));
  });

  return () => {
    unsubscribe();
  };
}, [dispatch]);

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
  <Routes>
      <Route path="/detalle-producto/*" element={<ProductDetailPage />} />
      <Route path="/" element={<LautyShopPage />} />

      {
        status === 'authenticated' && rol === 'administrator' && (
          <Route path="/admin" element={<AdminRoutes />} />
        )
      }

      {status === 'authenticated' ? (
        <Route path="/*" element={<LautyRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouther;
