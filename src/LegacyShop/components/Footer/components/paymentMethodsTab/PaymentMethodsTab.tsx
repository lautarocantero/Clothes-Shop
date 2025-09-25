import { Box, Typography } from "@mui/material"
import LogosExhibitor from "./LogosExhibitor"
import type { logosArrayType } from "../../types"

const PaymentMethodsTab = ({paymentMethods, shippingMethods}: {paymentMethods: logosArrayType[], shippingMethods: logosArrayType[]}) => {
  return (
    <Box>
        <Typography sx={{ color: theme => theme?.custom?.white, fontWeight: 'bold',textAlign: 'center', width: '100%' }} variant='h6'>Medios de Pago</Typography>
            <LogosExhibitor logos={paymentMethods}/>
        <Typography sx={{ color: theme => theme?.custom?.white, fontWeight: 'bold', textAlign: 'center', width: '100%' }} variant='h6'>Formas de envío</Typography>
            <LogosExhibitor logos={shippingMethods}/>
    </Box>
  )
}

export default PaymentMethodsTab
