import { contactMethods, linkArrayUser, paymentMethods, shippingMethods, socialMediaLinks } from "../../layout/layoutData"
import FooterComponent from "./FooterComponent"

const AppFooter = () => {
  return (
    <FooterComponent 
        color={'secondary'} 
        contactMethods={contactMethods}
        links={linkArrayUser} 
        paymentMethods={paymentMethods} 
        shippingMethods={shippingMethods} 
        socialMediaLinks={socialMediaLinks}
    />
  )
}

export default AppFooter
