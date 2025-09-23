import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';

type AuthStatus = "authenticated" | "checking" | "not-authenticated";

export interface authState {
    status: AuthStatus,
    id: string | null,    
    email: string,
    name: string,
    profilePhoto: string | null,
    errorMessage: string | null | undefined,
}

const initialState: authState = {
    status: 'checking',
    id: null,    
    email: '',
    name: '',
    profilePhoto: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: authState, {payload} ) => {
            state.status = 'authenticated';
            state.email = payload?.email;
            state.name = payload?.displayName;
            state.profilePhoto = payload?.photoUrl;
            state.id = payload?.uid;
            state.errorMessage = null;
        },
        logout: (state: authState, action: PayloadAction<{ errorMessage?: string} | undefined>) => {
            state.status = 'not-authenticated';
            state.email = '';
            state.name = '';
            state.profilePhoto = null;
            state.id = null;
            state.errorMessage = action?.payload?.errorMessage;
        },
        checkingCredentials: (state: authState, /*action*/ ) => {
            state.status = 'checking';
        },
        clearAuthError: (state: authState) => {
            state.errorMessage = null;
        }
    }
});

//recordar que el default son los reducers
export const { login, logout, checkingCredentials,clearAuthError } = authSlice.actions;

export type RootState = ReturnType<typeof store.getState>


export default authSlice.reducer;
