import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import type { productType } from '../../../LautyShopPage/types/productTypes';

declare global {
  interface Window {
    MercadoPago?: any;
  }
}

export type purchaseType =  {
  idUsuario: string,
  email: string,
  postalCode: number,
  shippingMethod: string,
  identificationType: string,
  identificationNumber: number,
  cart: productType[],
  totalAmount: number,
}

const MercadoPagoWallet = ({data}: {data: purchaseType}) => {
    
    const [preferenceId, setPreferenceId] = useState(null);
    const publicKey = 'APP_USR-0dfe0375-44e0-4be0-abc1-af3281a8c810';
    const createPreferenceIdEndpoint = 'https://c5pjn0t4ne.execute-api.us-east-2.amazonaws.com/dev/mercadopago/create-preference-id';

    useEffect(() => {
      if(!window.MercadoPago){
        initMercadoPago(publicKey, {locale: 'es-AR'});
      } else {
        console.log('Ya se inicializo.');
      }
    }, [])

    const createPreferenceIdFromAPI = async() => {
      const response = await axios.post(createPreferenceIdEndpoint, {
        cart: data.cart,
      },{
        headers: {
          "Content-Type" : "application/json",
        }
      })

      if(response) {
        setPreferenceId(response?.data?.id)
      }

    }


  return (
    <Box component={'div'}>
      <Button
        onClick={createPreferenceIdFromAPI}
        variant="contained"
        sx={{ width: {xs:'50%', md: '20%'}, color: theme => theme?.custom?.white }}
      >
        Comprar
      </Button>
      {
         preferenceId && 
          <Wallet initialization={{preferenceId: preferenceId}} 
            customization={{
              visual: {
                buttonBackground: 'blue',
                borderRadius: '5px',
              },
            } as any}
          />
        }
    </Box >
  )
}

export default MercadoPagoWallet
