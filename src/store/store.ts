import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { shopSlice } from "./shop";
import { userSlice } from "./user";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        shop: shopSlice.reducer,
        user: userSlice.reducer,
    },
})