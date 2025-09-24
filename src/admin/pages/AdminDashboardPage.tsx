import LautyShopLayout from "../../LautyShop/layout/LautyShopLayout";
import { GridLegacy as Grid, Typography, Box, Link } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";


type actionsType = {
  linkTitle: string,
  link: string,
}

const AdminPosibleActionsShop: actionsType[] = [
  { linkTitle: 'Crear Producto', link: '/', },
  { linkTitle: 'Editar Producto', link: '/', },
  { linkTitle: 'Eliminar Producto', link: '/', },
]

const AdminPosibleActionsUser: actionsType[] = [
  { linkTitle: 'Crear usuario', link: '/', },
  { linkTitle: 'Editar usuario', link: '/', },
  { linkTitle: 'Eliminar usuario', link: '/', },
]

const AdminPosibleActionsAdmin: actionsType[] = [
  { linkTitle: 'Crear nuevo administrador', link: '/', },
  { linkTitle: 'Editar administrador', link: '/', },
  { linkTitle: 'Eliminar administrador', link: '/', },
]

const AdminActions = ({ links, title }: { links: actionsType[], title: string }) => {
  return (
    <Grid container xs={12} marginTop={5} display={'flex'} flexDirection={'column'}>
      <Grid item>
        <Typography variant="h2" fontSize={theme => theme?.typography?.h3?.fontSize} sx={{borderBottom: '1px dotted white', textAlign: 'left'}}>{title}</Typography>
      </Grid>
      <Grid item>
        {
          links?.map(({linkTitle, link}) => (
            <Link 
              key={linkTitle}
              component={LinkRouter} 
              to={link} 
              sx={{ color: theme => theme?.custom?.white, textAlign: 'left' }}
              onClick={() => {}}>
                <Typography sx={{ colour: theme => theme?.custom?.accent }}>{linkTitle}</Typography>
            </Link>
          ))
        }
      </Grid>
    </Grid>
  );
};

const AdminDashboardPage = () => {

  return (
    <LautyShopLayout>
      <Box  sx={{ margin: '120px auto 50px', color: theme => theme?.custom?.white }}>
        <Grid container display='flex' flexDirection={'column'} sx={{ padding: 2, backgroundColor: theme => theme?.palette?.primary?.main, width:{xs: '90%', md:'30%'}, justifySelf: 'center', borderRadius: '2%'}}>
          <Grid item xs={12}>
            <Typography variant="h1" fontSize={theme => theme?.typography?.h3?.fontSize}>
              Admin Dashboard  
            </Typography> 
          </Grid>
          <AdminActions links={AdminPosibleActionsShop} title={'Tienda'}/>
          <AdminActions links={AdminPosibleActionsUser} title={'Usuarios'}/>
          <AdminActions links={AdminPosibleActionsAdmin} title={'Administradores'}/>
        </Grid>
      </Box>
    </LautyShopLayout>
  )
}

export default AdminDashboardPage
