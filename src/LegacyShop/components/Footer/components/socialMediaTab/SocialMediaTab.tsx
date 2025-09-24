import { Box, GridLegacy as Grid, Typography } from "@mui/material"
import type { socialMediaLink } from "../../types"
import SocialMediaExhibitor from "./SocialMediaExhibitor"

const SocialMediaTab = ({socialMediaLinks}: {socialMediaLinks: socialMediaLink[]}) => {
  return (
    <Box>
        <Typography sx={{ color: theme => theme?.custom?.white, fontWeight: 'bold', textAlign: 'center' }} variant='h6'>Redes Sociales</Typography>
        <Grid container display={'flex'} spacing={2} justifyContent={'center'} sx={{ mt: '1px' }}>
            {
                socialMediaLinks?.map((socialMedia: socialMediaLink) => (
                    <Grid item key={socialMedia?.srcPath}>
                    <SocialMediaExhibitor socialMedia={socialMedia} />
                    </Grid>
                ))
            }

        </Grid>
    </Box>
  )
}

export default SocialMediaTab
