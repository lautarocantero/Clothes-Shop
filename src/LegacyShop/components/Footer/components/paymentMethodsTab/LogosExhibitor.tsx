import { Grid } from "@mui/material"
import type { logosArrayType } from "../../types"


const LogosExhibitor = ({logos}: {logos: logosArrayType[]}) => {
  return (
    <Grid container spacing={1} sx={{ width: { xs: '100%' }, justifyContent: {xs:'center', sm: '-moz-initial'} }}>
    {logos?.map(({name, id, url}) => (
        <Grid key={id}>
            <img 
              src={url} 
              alt={name} 
              style={{ width: 50 }} 
              loading="lazy"
            />
        </Grid>
    ))}
    </Grid>
  )
}

export default LogosExhibitor


