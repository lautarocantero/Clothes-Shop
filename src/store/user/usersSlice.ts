import { createSlice } from "@reduxjs/toolkit"
import type { store } from "../store"
import type { productType } from "../../LegacyShop/pages/LautyShopPage/types/productTypes";
import type { RolType } from "../../auth/types/AuthTypes";

export interface usersSliceState {
    cart:  productType[],
    id: string | null,
    name: string,
    rol: RolType,
    cartTotalAmount: number,
    isLoadingCart: boolean,
}

const initialState: usersSliceState = {
    cart: [],
    id: null,
    name: '',
    rol: null,
    cartTotalAmount: 0,
    isLoadingCart: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setRol: (state, action) => {
            state.rol = action?.payload;
        },
        setUser: (state, action) => {
            state.id = action?.payload?.id;
            state.name = action?.payload?.name;
            state.rol = action?.payload?.rol;
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
            state.cart = [];
        },
        logoutUser: (state) => {
            state.id = null;
            state.name = '';
            state.rol = null;
            state.cart = [];
            state.isLoadingCart = false
        }
    }
})

export const {setUser, setRol,  setLoadCart,setCart,addToCart, buyCart, logoutUser} = usersSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default usersSlice;

