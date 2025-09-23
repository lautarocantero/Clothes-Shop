import { Box } from "@mui/material"
import {AppFooter, NavBar} from "../components"
import { linkArray} from "./layoutData"
import type { PropsWithChildren } from "react";

const LautyShopLayout = ({ children }: PropsWithChildren) => {
  const hasChildren = !!children;
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      // minWidth='100vw'
    >
      <NavBar color="primary" links={linkArray} />

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
