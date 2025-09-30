import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { savePurchase } from "../../../../store/user";
import type { purchaseStateOptions, ThanksForBuyingProps } from "../PaymentMethodTypes";



const ThanksForBuying = ({ paymentState, dispatch, userId }: ThanksForBuyingProps) => {
  const isValidState = (value: any): value is Exclude<purchaseStateOptions, null> =>
    ["approved", "fail", "pending"].includes(value);

  const alreadySaved = useRef(false);

  useEffect(() => {
    if (paymentState === "approved" && !alreadySaved.current) {
      alreadySaved.current = true;
      dispatch(savePurchase({ userId }) as any);
    }
  }, [paymentState, userId, dispatch]);

  if (!isValidState(paymentState)) return null;

  return (
    <Box
      className="animate__animated animate__fadeInDown"
      sx={{
        margin: "110px auto 50px",
        width: { xs: "95%", md: "40%" },
        backgroundColor: (theme) => theme?.palette?.primary?.main,
        borderRadius: "20px",
        color: (theme) => theme?.custom?.white,
        padding: 2,
        fontSize: (theme) => theme?.typography?.h1?.fontSize,
        textAlign: "center",
      }}
    >
      {paymentState === "approved" && <span>¡Thanks for Buying!</span>}
      {paymentState === "fail" && <span>¡Uups, something went wrong, try again later!</span>}
      {paymentState === "pending" && <span>Processing...</span>}
    </Box>
  );
};

export default ThanksForBuying;
