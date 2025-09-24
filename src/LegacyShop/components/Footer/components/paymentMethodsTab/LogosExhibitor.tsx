import { GridLegacy as Grid } from "@mui/material"
import type { logosArrayType } from "../../types"


const LogosExhibitor = ({logos}: {logos: logosArrayType[]}) => {
  return (
    <Grid container spacing={1} sx={{ width: { xs: '100%' } }}>
    {logos?.map(({name, id, url}) => (
        <Grid item key={id}>
            <img 
              src={`${url}`} 
              alt={name} 
              style={{ width: 50 }} 
            />
        </Grid>
    ))}
    </Grid>
  )
}

export default LogosExhibitor
