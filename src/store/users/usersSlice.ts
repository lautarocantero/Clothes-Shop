import { createSlice } from "@reduxjs/toolkit"
import type { productType } from "../../LautyShop/pages/LautyShopPage/types/productTypes"
import type { store } from "../store"

export interface usersSliceState {
    cart:  productType[],
    id: string,
    name: string,
    cartTotalAmount: number,
    isLoadingCart: boolean,
}

const initialState: usersSliceState = {
    cart: [],
    id: '',
    name: '',
    cartTotalAmount: 0,
    isLoadingCart: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action?.payload?.id;
            state.name = action?.payload?.name;
            state.cart = action?.payload?.cart;
            state.isLoadingCart = action?.payload?.isLoadingCart
        },
        setLoadCart: (state, action) => {
            state.isLoadingCart = action?.payload;
        },
        setCart: (state, action) => {
            state.cart = action?.payload;
            state.isLoadingCart = false;
        },
        addToCart: (state, action) => {
            if(!action.payload) return;
            state.cart = [...state.cart,  action?.payload];
        },
        buyCart: (state) => {
            // se vacia y te manda a la pagina de tarjeta de compra
            state.cart = [];
        }
    }
})

export const {setUser, setLoadCart,setCart,addToCart, buyCart} = usersSlice.actions;

export type RootState = ReturnType<typeof store.getState>

export default usersSlice;