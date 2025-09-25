import { Box, GridLegacy as Grid } from '@mui/material';
import type { FooterInterface } from './types';
import NavegationTab from './components/navegationTab/NavegationTab';
import ContactTab from './components/contactTab/ContactTab';
import PaymentMethodsTab from './components/paymentMethodsTab/PaymentMethodsTab';
import SocialMediaTab from './components/socialMediaTab/SocialMediaTab';

const FooterComponent = ( {
  contactMethods = [],
  links = [], 
  paymentMethods = [],  
  shippingMethods = [],
  socialMediaLinks = [],
} : FooterInterface ) => {

return (
  <Box
    style={{
      width: '100%',
      position: 'relative',
      left: 0,
      margin: 0,
      padding: 0,
    }}
    component={'footer'}
  >
    <Grid 
        container 
        display={'flex'}
        justifyContent={'center'}
        sx={{
          backgroundColor: theme => theme.palette.primary.main,
          p: 2,
          width: '100%'
        }}
        >
        {/* NAVEGACION */}
        <Grid item sx={{ mt: { xs: '20px'} }} xs={12} sm={3} md={3}>
          <NavegationTab links={links} />
        </Grid>    

        {/* METODOS DE PAGO */}
        <Grid item sx={{ mt: { xs: '20px'} }} xs={12} sm={3} md={3}>
          <PaymentMethodsTab
            paymentMethods={paymentMethods} 
            shippingMethods={shippingMethods}
          />
        </Grid>
        {/* CONTACTO */}
        <Grid item sx={{ mt: { xs: '20px'} }} xs={12} sm={3} md={3}>
            <ContactTab contactMethods={contactMethods}/>
        </Grid>
        {/* REDES SOCIALES */}
        <Grid item sx={{ mt: { xs: '20px'} }} xs={12} sm={3} md={3}>
            <SocialMediaTab socialMediaLinks={socialMediaLinks} />
        </Grid>

              
    </Grid>
  </Box>
);

}

export default FooterComponent
