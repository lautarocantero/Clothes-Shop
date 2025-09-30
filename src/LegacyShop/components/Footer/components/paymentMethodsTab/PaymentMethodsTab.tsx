import { Box, Typography } from "@mui/material"
import LogosExhibitor from "./LogosExhibitor"
import type { logosArrayType } from "../../types"

const PaymentMethodsTab = ({paymentMethods, shippingMethods}: {paymentMethods: logosArrayType[], shippingMethods: logosArrayType[]}) => {
  return (
    <Box>
        <Typography sx={{ color: theme => theme?.custom?.white, fontWeight: 'bold',textAlign: 'center', width: '100%' }} variant='h6'>Payment Methods</Typography>
            <LogosExhibitor logos={paymentMethods}/>
        <Typography sx={{ color: theme => theme?.custom?.white, fontWeight: 'bold', textAlign: 'center', width: '100%' }} variant='h6'>Shipping Methods</Typography>
            <LogosExhibitor logos={shippingMethods}/>
    </Box>
  )
}

export default PaymentMethodsTab
