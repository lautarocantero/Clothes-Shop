import { firebaseAuthErrors } from "./AuthErrorMessages";

export   const getFirebaseErrorMessage = (errorMessage: string): string => {
    for (const key in firebaseAuthErrors) {
      if (errorMessage.includes(key)) {
        return firebaseAuthErrors[key];
      }
    }
    return 'Uups something went wrong, try again.';
  };