import {  Button, Grid,Link, Typography } from "@mui/material";
import queryString from  "query-string";
import { Link as LinkReactRouter, useLocation } from "react-router-dom";

const RemoveFilter = () => {
  const location = useLocation();
  const { type, size } = queryString.parse(location.search) as {
    type?: string;
    size?: string;
  };

  if (!type && !size) return null;

  return (
    <Button
      component={LinkReactRouter}
      to="/"
      sx={{
        colour: (theme) => theme.palette.primary.main,
        backgroundColor: (theme) => theme.custom.white,
        textTransform: "none",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
          fontSize: "1.1em",
        },
      }}
    >
      Borrar Filtros
    </Button>
  );
};

const FilterHeader = () => {

  return (
    <Grid container display={'flex'} gap={2}>
      <Typography component={'h2'} sx={{ fontSize: theme => theme?.typography?.h2?.fontSize}}>Filtros</Typography>
      <RemoveFilter />
    </Grid>
  );
};

export default FilterHeader;