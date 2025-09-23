import { GridLegacy as Grid, Typography } from "@mui/material"
import type { ReactNode } from "react"

const AuthLayout = ({children, title = ''}: {children: ReactNode, title: string | null}) => {
  return (
    <Grid
        container
        className="animate__animated animate__fadeIn animate__faster"
        spacing={0}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', color: theme => theme?.custom?.white }}
    >
        <Grid 
            item
            component={'div'}
            xs={12}
            sx={{ backgroundcolor: theme => theme?.custom?.white, borderRadius: 2, padding: 3, width: '100%' }}
        >
            <Typography variant="h5" sx={{ mb: 1}} >{title}</Typography>
            {children}
        </Grid>
    </Grid>
  )
}

export default AuthLayout
