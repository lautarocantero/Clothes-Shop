import { Box } from "@mui/material"
import {AppFooter, NavBar} from "../components"
import { useEffect, type PropsWithChildren } from "react";
import { linkArrayAdmin, linkArrayUser } from "./layoutData";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/auth";
import { getUserRol, type RootState as UserRootState } from "../../store/users";

const LautyShopLayout = ({ children }: PropsWithChildren) => {
  const hasChildren = !!children;
  const dispatch = useDispatch();

  const { status, id } = useSelector((state: RootState) => state?.auth);
  const { rol } = useSelector((state: UserRootState) => state?.user);

  useEffect(() => {
    if(status === 'authenticated' && !rol){
      dispatch(getUserRol(id as string) as any);
  }
  },[])

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      // minWidth='100vw'
    >
      <NavBar color="primary" links={ rol === 'administrator' ?  linkArrayAdmin : linkArrayUser } />

        <Box component="main" flexGrow={1}>
          {hasChildren ? children : 
            <Box sx={{ 
              margin: 'none',
              width: '100vw', 
              height: '100%', 
              minHeight: '80vh', 
              background: 'black' 
              }} 
            />}
        </Box>

      <AppFooter />
    </Box>
  );
};

export default LautyShopLayout
