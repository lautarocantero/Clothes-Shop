import type { productType } from "../LautyShopPage/types/productTypes";

export interface ProductsExhibitorProps {
  products: productType[];
  onRemoveProduct: (args: { productId: string; cart: productType[] }) => void;
}

export interface CartFooterProps {
  cart: any;
  handleBuyCart: () => void;
}