import { contactMethods, linkArrayUser, paymentMethods, shippingMethods, socialMediaLinks } from "../../layout/LayoutData"
import FooterComponent from "./FooterComponent"

const AppFooter = () => {
  return (
    <FooterComponent 
        contactMethods={contactMethods}
        links={linkArrayUser} 
        paymentMethods={paymentMethods} 
        shippingMethods={shippingMethods} 
        socialMediaLinks={socialMediaLinks}
    />
  )
}

export default AppFooter
