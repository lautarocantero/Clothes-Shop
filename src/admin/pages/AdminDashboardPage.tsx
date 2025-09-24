import { GridLegacy as Grid, Typography, Box, Link } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import LegacyShopLayout from "../../LegacyShop/layout/LegacyShopLayout";
import type { actionsType } from "../types/AdminDashboardTypes";
import {
  AdminPosibleActionsAdmin,
  AdminPosibleActionsShop,
  AdminPosibleActionsUser,
} from "../helpers";

const LinksExpositure = ({ links }: { links: actionsType[] }) => {
  return (
    <Grid item>
      {links?.map(({ linkTitle, link }) => (
        <Link
          key={linkTitle}
          component={LinkRouter}
          to={link}
          sx={{ color: (theme) => theme?.custom?.white, textAlign: "left" }}
        >
          <Typography>
            {linkTitle}
          </Typography>
        </Link>
      ))}
    </Grid>
  );
};

const AdminActions = ({ links, title }: { links: actionsType[]; title: string }) => {
  return (
    <Grid container marginTop={5} display={"flex"} flexDirection={"column"}>
      <Grid item>
        <Typography
          variant="h2"
          fontSize={(theme) => theme?.typography?.h3?.fontSize}
          sx={{ borderBottom: "1px dotted white", textAlign: "left" }}
        >
          {title}
        </Typography>
      </Grid>
      <LinksExpositure links={links} />
    </Grid>
  );
};

const AdminDashboardPage = () => {
  return (
    <LegacyShopLayout>
      <Box
        sx={{
          color: (theme) => theme?.custom?.white,
          margin: '120px auto 50px',
        }}
      >
        <Grid
          container
          display="flex"
          flexDirection={"column"}
          sx={{
            padding: 2,
            backgroundColor: (theme) => theme?.palette?.primary?.main,
            width: { xs: "90%", md: "30%" },
            justifySelf: "center",
            borderRadius: "2%",
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h1"
              fontSize={(theme) => theme?.typography?.h3?.fontSize}
            >
              Admin Dashboard
            </Typography>
          </Grid>
          <AdminActions links={AdminPosibleActionsShop} title={"Tienda"} />
          <AdminActions links={AdminPosibleActionsUser} title={"Usuarios"} />
          <AdminActions links={AdminPosibleActionsAdmin} title={"Administradores"} />
        </Grid>
      </Box>
    </LegacyShopLayout>
  );
};

export default AdminDashboardPage;
