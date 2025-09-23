import { createSlice } from '@reduxjs/toolkit';
import type { productType } from '../../LautyShop/pages/LautyShopPage/types/productTypes';
import type { store } from '../store';

export interface shopSliceState {
    clothes: productType[],

}

const initialState: shopSliceState = {
    clothes: [],

}

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setClothes: (state, action) => {
            state.clothes = action?.payload
        }
    }
})

export const {setClothes} = shopSlice.actions;

export type RootState = ReturnType<typeof store.getState>

export default  shopSlice;
