import { firebaseAuthErrors } from "./AuthErrorMessages";

export   const getFirebaseErrorMessage = (errorMessage: string): string => {
    for (const key in firebaseAuthErrors) {
      if (errorMessage.includes(key)) {
        return firebaseAuthErrors[key];
      }
    }
    return 'Ocurrió un error inesperado.';
  };