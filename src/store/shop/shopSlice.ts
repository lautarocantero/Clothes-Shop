import { createSlice } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { productType } from '../../LegacyShop/pages/LautyShopPage/types/productTypes';

export interface shopSliceState {
    clothes: productType[],
    isLoadingClothes: boolean,
}

const initialState: shopSliceState = {
    clothes: [],
    isLoadingClothes: false,
}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setLoadingClothes: (state, action) => {
            state.isLoadingClothes = action?.payload;
        },
        setClothes: (state, action) => {
            state.clothes = action?.payload;
            state.isLoadingClothes = false;
        }
    }
})

export const {setLoadingClothes, setClothes} = shopSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default  shopSlice;


