import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { mainTheme } from "../theme"


export const AppTheme = ({children}: {children: any}) => {
    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
                {children}
        </ThemeProvider>
    )
}