import { contactMethods, linkArray, paymentMethods, shippingMethods, socialMediaLinks } from "../../layout/layoutData"
import FooterComponent from "./FooterComponent"

const AppFooter = () => {
  return (
    <FooterComponent 
        color={'secondary'} 
        contactMethods={contactMethods}
        links={linkArray} 
        paymentMethods={paymentMethods} 
        shippingMethods={shippingMethods} 
        socialMediaLinks={socialMediaLinks}
    />
  )
}

export default AppFooter
