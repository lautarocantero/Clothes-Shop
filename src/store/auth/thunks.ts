import type { Dispatch } from "@reduxjs/toolkit"
import { LoginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, clearAuthError, login, logout } from "./authSlice";


export const startGoogleSignIn = () => {
    return async (dispatch: Dispatch) => {
        const response = await singInWithGoogle();

        if(!response?.ok) {
            dispatch(logout({
                errorMessage: response?.errorMessage
            }))
            return;
        }

        const {displayName, email, photoURL, uid} = response;

        dispatch(login({
            displayName, email, photoURL, uid
        }))

    }
}

interface startSignInEmail {
    email: string;
    password: string;
}

export const startLoginWithEmailPassword = ({email, password}: startSignInEmail ) => {
    return async(dispatch: Dispatch) => {
        dispatch(checkingCredentials());
        console.log('email', email);
        const {errorMessage, displayName, ok, photoURL, uid} = await LoginWithEmailPassword({email,password});

        if(!ok) return dispatch(logout({errorMessage}));
        
        dispatch(login({displayName, email,photoURL,uid}));
    }
}


interface createUserEmailPassword extends startSignInEmail {
    displayName: string,
}

export const startCreateUserWithEmailAndPassword = ({email, password, displayName}: createUserEmailPassword ) => {

    return async(dispatch: Dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await  registerUserWithEmailPassword({email, password, displayName});
    
        if(!ok) {
            return dispatch(logout({errorMessage: errorMessage?.message}))
        };

        dispatch(login({uid, displayName, email, photoURL}));

    }

}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        await logoutFirebase();
        
        dispatch(logout());

    }
}

export const startCleanAuthMessage = () => {
    return async (dispatch: Dispatch) => {
        await dispatch(clearAuthError());
    }
}