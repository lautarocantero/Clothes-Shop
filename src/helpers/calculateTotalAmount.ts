import type { productType } from "../LegacyShop/pages/LautyShopPage/types/productTypes";

export const calculateTotalAmount = (cart: productType[]) => {
  if (!Array.isArray(cart)) return 0;

  return cart?.reduce((total, product) => {
    return total + Number(product?.price ?? 0);
  }, 0);
};