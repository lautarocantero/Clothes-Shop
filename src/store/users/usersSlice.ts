import { createSlice } from "@reduxjs/toolkit"
import type { productType } from "../../LautyShop/pages/LautyShopPage/types/productTypes"
import type { store } from "../store"


export interface usersSliceState {
    cart:  productType[],
    id: string,
    name: string,
    cartTotalAmount: number,
}

const initialState: usersSliceState = {
    cart: [],
    id: '',
    name: '',
    cartTotalAmount: 0,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action?.payload?.id;
            state.name = action?.payload?.name;
            state.cart = action?.payload?.cart;
        },
        setCart: (state, action) => {
            state.cart = action?.payload
        },
        addToCart: (state, action) => {
            if(!action.payload) return;
            state.cart = [...state.cart,  action?.payload];
        },
        buyCart: (state) => {
            state.cart = [];
        }
    }
})

export const {setUser, setCart,addToCart, buyCart} = usersSlice.actions;

export type RootState = ReturnType<typeof store.getState>

export default usersSlice;