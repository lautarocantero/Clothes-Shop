import { GridLegacy as Grid, Typography } from "@mui/material";
import React from "react";
import { getFirebaseErrorMessage } from "../../helpers/getFireBaseErrorMessage";

  
    interface ErrorExpositureProps {
        errorMessage: string;
    }

    export const ErrorExpositure = React.memo(({ errorMessage }: ErrorExpositureProps) => {
        if (!errorMessage) return null;

        return (
        <Grid xs={12} sm={12} mt={2}>
            <Typography
            sx={{
                color: theme => theme?.palette?.error?.main
            }}
            component="h5"
            >
            {getFirebaseErrorMessage(errorMessage)}
            </Typography>
        </Grid>
        );
    });

  export default ErrorExpositure


