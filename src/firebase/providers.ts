import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, type User } from "firebase/auth";
import { FirebaseAuth } from "./firebase";


interface loginWithUserEmail {
    email: string,
    password: string,
}

interface registerWithUserEmail extends loginWithUserEmail  {
    displayName: string,
}

export const RegisterUserWithEmailPassword = async({email, password, displayName}: registerWithUserEmail ) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL} = resp?.user;

        await updateProfile( FirebaseAuth.currentUser as User, { displayName } )

        return {
            ok: true,
            uid, photoURL, email, displayName,
        }
        
    } catch (error: any) {
        return {
            ok: false,
            errorMessage: error,
        }
    }
}

export const LoginWithEmailPassword = async({email, password} : loginWithUserEmail ) => {
    try {
        const resp = signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {displayName, photoURL, uid} =  (await resp).user;

        return {
            ok: true,
            email, displayName, photoURL, uid
        }

    } catch (error: any) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}