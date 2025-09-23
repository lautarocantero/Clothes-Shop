import { Grid } from '@mui/material';
import type { contactMethodsType, logosArrayType, socialMediaLink } from './types';
import type { AppBarColor, NavBarLink } from '../NavBar/types';
import NavegationTab from './components/navegationTab/NavegationTab';
import ContactTab from './components/contactTab/ContactTab';
import PaymentMethodsTab from './components/paymentMethodsTab/PaymentMethodsTab';
import SocialMediaTab from './components/socialMediaTab/SocialMediaTab';
// import { paymentMethodsIcons } from './data/footerData';

interface FooterInterface {
  color?: AppBarColor,
  contactMethods?: contactMethodsType[],
  links: NavBarLink[],
  paymentMethods?: logosArrayType[],
  shippingMethods?:  logosArrayType[],
  socialMediaLinks?: socialMediaLink[],
}

const FooterComponent = ( {
  color = 'primary', 
  contactMethods = [],
  links = [], 
  paymentMethods = [],  
  shippingMethods = [],
  socialMediaLinks = [],
} : FooterInterface ) => {

return (
  <footer
    style={{
      width: '100%',
      position: 'relative',
      left: 0,
      margin: 0,
      padding: 0,
    }}
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
  </footer>
);

}

export default FooterComponent

 {/* agregar links de doned los saque <a target="_blank" href="https://icons8.com/icon/85154/instagram">Instagram</a> icono de <a target="_blank" href="https://icons8.com">Icons8</a> */}
