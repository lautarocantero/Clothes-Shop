import type { Dispatch } from "@reduxjs/toolkit"
import { LoginWithEmailPassword, logoutFirebase, RegisterUserWithEmailPassword } from "../../firebase/providers"
import { checkingCredentials, clearAuthError, login, logout } from "./authSlice";
import { FirebaseDb } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { logoutUser, setRol } from "../user";

interface startSignInEmail {
    email: string;
    password: string;
}

interface User {
    name: string;
    rol: string;
    cart?: any[];
}

export const startLoginWithEmailPassword = ({email, password}: startSignInEmail ) => {
    return async(dispatch: Dispatch) => {
        dispatch(checkingCredentials());
        try {
            const {errorMessage, displayName, ok, photoURL, uid} = await LoginWithEmailPassword({email,password});
    
            if(!ok) return dispatch(logout({errorMessage}));
            dispatch(login({displayName, email,photoURL,uid}));
            
            if(!uid) return;
            const userDocRef = doc(FirebaseDb, 'users', uid);
            const userSnap = await getDoc(userDocRef);
            
            if (!userSnap.exists()) {
                return;
            }
    
            const user = {
            id: userSnap.id,
            ...(userSnap.data() as Omit<User, "id">),
            };
            dispatch(setRol(user?.rol))
        } catch(error: any) {
            dispatch(logout({ errorMessage: error.message || "Error while login user" }));
        }
    }
}


interface createUserEmailPassword extends startSignInEmail {
    displayName: string,
    rol: string,
}

export const startCreateUserWithEmailAndPassword = ({email, password, displayName, rol}:        createUserEmailPassword ) => {
    return async(dispatch: Dispatch) => {
        dispatch(checkingCredentials());

        //hash is no needed if i use register from firebase
        try {
            const { ok, uid, photoURL, errorMessage } = await RegisterUserWithEmailPassword({ email, password, displayName });

            if (!ok) {
                return dispatch(logout({ errorMessage: errorMessage?.message }));
            }

            const docRef = doc(FirebaseDb, "users", `${uid}`);
            await setDoc(docRef, { id: uid, cart: [], name: displayName, rol }, { merge: true });

            dispatch(login({ uid, displayName, email, photoURL }));
            dispatch(setRol(rol));
        } catch (error: any) {
            dispatch(logout({ errorMessage: error.message || "Error while creating user" }));
        }
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