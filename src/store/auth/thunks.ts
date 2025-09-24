import type { Dispatch } from "@reduxjs/toolkit"
import { LoginWithEmailPassword, logoutFirebase, RegisterUserWithEmailPassword } from "../../firebase/providers"
import { checkingCredentials, clearAuthError, login, logout } from "./authSlice";
import { FirebaseDb } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore/lite";
import { logoutUser, setUser } from "../users";

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
    rol: string,
}

export const startCreateUserWithEmailAndPassword = ({email, password, displayName, rol}: createUserEmailPassword ) => {
    return async(dispatch: Dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await  RegisterUserWithEmailPassword({email, password, displayName});
        if(!ok) {
            return dispatch(logout({errorMessage: errorMessage?.message}))
        };
        const docRef = doc(FirebaseDb, 'users', `${uid}`)
        await setDoc(docRef, { id: uid, cart: [], name:displayName, rol}, {merge:true});
        dispatch(login({uid, displayName, email, photoURL}));
    }

}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        await logoutFirebase();
        dispatch(logout());
        dispatch(logoutUser());
        
    }
}

export const startCleanAuthMessage = () => {
    return async (dispatch: Dispatch) => {
        await dispatch(clearAuthError());
    }
}