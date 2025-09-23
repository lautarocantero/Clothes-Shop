import { Box, Grid, Typography } from "@mui/material"
import LinksExhibitor from "./LinksExhibitor"
import type { NavBarLink } from "../../../NavBar/types"

const NavegationTab = ({links}: {links: NavBarLink[] }) => {
  return (
    <Box>
        <Typography sx={{ color: theme => theme?.custom?.white, fontWeight: 'bold',textAlign: 'center' }} variant='h6'>Navegación</Typography>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <LinksExhibitor links={links} />
          </Grid>
      </Grid>
    </Box>
  )
}

export default NavegationTab
