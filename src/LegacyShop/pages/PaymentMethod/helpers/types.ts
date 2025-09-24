import type { productType } from "../../LautyShopPage/types/productTypes";

export interface PurchaseProps  {
    contact: string;
    postalCode: number;
    shippingMethod: string;
    notes: string;
    paymentMethod: string;
    creditCardNumber?: number;
    creditCardOwner?: string;
    creditCardExpirationDate?: string;
    creditCardCvv?: string;
    identificationType?: string;
    identificationNumber?: string;
  }

  export interface CompletePurchaseProps extends PurchaseProps  {
    cart: productType[];
    totalAmount: number;
    userId: string | null;
    purchaseDate: number;
    name: string;
  }