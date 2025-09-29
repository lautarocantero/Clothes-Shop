
export type purchaseStateOptions = 'approved' | 'fail' | 'pending' | null;

export interface ThanksForBuyingProps {
  paymentState: purchaseStateOptions;
  dispatch: any;
  userId: string;
}