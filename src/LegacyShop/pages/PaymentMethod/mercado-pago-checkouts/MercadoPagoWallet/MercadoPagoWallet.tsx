import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Box } from '@mui/material';
import { useEffect } from "react";

declare global {
  interface Window {
    MercadoPago?: any;
  }
}

const MercadoPagoWallet = ({ preferenceId }: { preferenceId: string | null }) => {
  const publicKey = 'APP_USR-0dfe0375-44e0-4be0-abc1-af3281a8c810';

  useEffect(() => {
    if (!window.MercadoPago) {
      initMercadoPago(publicKey, { locale: 'es-AR' });
    }
  }, []);
  if (!preferenceId) return null;

  return (
    <Box>
      <Wallet
        initialization={{ preferenceId }}
        customization={{
          visual: {
            buttonBackground: 'blue',
            borderRadius: '5px',
          },
        } as any}
      />
    </Box>
  );
};

export default MercadoPagoWallet;
