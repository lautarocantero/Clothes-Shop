import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { shopSlice } from "./shop";
import { usersSlice } from "./users";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        shop: shopSlice.reducer,
        user: usersSlice.reducer,
    },
})