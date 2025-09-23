import type { Dispatch } from "@reduxjs/toolkit"
import { LoginWithEmailPassword, logoutFirebase, RegisterUserWithEmailPassword } from "../../firebase/providers"
import { checkingCredentials, clearAuthError, login, logout } from "./authSlice";
import { useNavigate } from "react-router-dom";

interface startSignInEmail {
    email: string;
    password: string;
}

export const startLoginWithEmailPassword = ({email, password}: startSignInEmail ) => {
    return async(dispatch: Dispatch) => {
        dispatch(checkingCredentials());
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

        const {ok, uid, photoURL, errorMessage} = await  RegisterUserWithEmailPassword({email, password, displayName});
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