import { Grid, Typography } from "@mui/material"
import ContactExhibitor from "./ContactExhibitor"
import type { contactMethodsType } from "../../types"

const ContactTab = ({contactMethods} : {contactMethods: contactMethodsType[]}) => {
  return (
      <Grid container direction="column" alignItems="center">
        <Typography sx={{ color: theme => theme?.custom?.white, fontWeight: 'bold', textAlign: 'center'}} variant='h6'>Contact</Typography>
        <ContactExhibitor contacts={contactMethods} />  
      </Grid>
  )
}

export default ContactTab
