import { createSlice } from '@reduxjs/toolkit';
import type { productType } from '../../LautyShop/pages/LautyShopPage/types/productTypes';
import type { store } from '../store';

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

export default  shopSlice;
