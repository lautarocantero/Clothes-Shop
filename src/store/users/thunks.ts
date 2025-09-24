import type { Dispatch } from "@reduxjs/toolkit";
import { addToCart, setCart, setLoadCart, setRol, setUser } from "./usersSlice";
import type { productType } from "../../LautyShop/pages/LautyShopPage/types/productTypes";
import { FirebaseDb } from "../../firebase/firebase";
import type { RootState } from "../auth";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

export const getUserRol = (id: string) => {
  return async(dispatch: Dispatch) => {
    try{
      if(!id) return;
      const userDocRef = doc(FirebaseDb, 'users', id);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        console.log('El documento del usuario no existe');
        return;
      }
      
      const {rol} = userSnap.data();
      dispatch(setRol(rol));
    }
    catch(error) {
      console.log(error);
    }
  }
}

export const startLoadingCart = (filters: { id?: string } = {}) => {
  return async (dispatch: Dispatch) => {
    try {
      if (!filters.id) return;

      dispatch(setLoadCart(true));

      const userDocRef = doc(FirebaseDb, 'users', filters?.id);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        console.log('No se encontró el usuario');
        return;
      }

      const user = {
        id: userSnap.id,
        ...userSnap.data(),
      };
      dispatch(setUser(user));
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };
};

export const startAddToCart = (product: productType) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(addToCart(product));

      const { id: userId } = getState().auth;
      const { cart } = getState().user;

      const docRef = doc(FirebaseDb, 'users', `${userId}`);
      await setDoc(docRef, { id: userId, cart }, { merge: true });

    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };
};

export const startRemoveFromCart = (productsFiltered: productType[]) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { id: userId, name } = getState().user;
      const docRef = doc(FirebaseDb, 'users', `${userId}`)
      await setDoc(docRef, { id: userId, cart: productsFiltered, name}, {merge:true});
      dispatch(setCart(productsFiltered));
    } catch (error) {
      console.log(error)
    }
  }
}

export const startBuyCart = () => {
  return async( dispatch: Dispatch, getState: () => RootState) => {
    try{
      const { id: userId, name } = getState().user;
      const docRef = doc(FirebaseDb, 'users', `${userId}`)
      await setDoc(docRef, { id: userId, cart: [], name}, {merge:true});
      dispatch(setCart([]));
      return true;
    } catch (error){
      console.log(error)
      return false;
    }
  }
}