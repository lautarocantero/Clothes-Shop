import { Typography } from "@mui/material";
import type { contactMethodsType } from "../../types";

interface ContactExhibitorInterface {
    contacts: contactMethodsType[]
}

const ContactExhibitor = ( {contacts}: ContactExhibitorInterface ) => {
    return (
        <ul>
        {
            contacts?.map(({icon, text}: contactMethodsType) => (
                <li key={text} style={{ listStyle: 'none', marginTop: '10px'}}>
                    <Typography
                        sx={{
                            color: theme => theme?.custom?.white,
                            display: 'flex',
                            fontStyle: 'italic',
                        }}
                        >
                        {icon}
                        {text}
                    </Typography>
                </li>
            )) 
        }
         </ul>
  )
}

export default ContactExhibitor
