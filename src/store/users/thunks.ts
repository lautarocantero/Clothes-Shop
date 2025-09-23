import type { Dispatch } from "@reduxjs/toolkit";
import { addToCart, setCart, setUser} from "./usersSlice";
import type { productType } from "../../LautyShop/pages/LautyShopPage/types/productTypes";
import { loadUsers } from "./loadUsers";
import { FirebaseDb } from "../../firebase/firebase";
import type { RootState } from "../auth";
import { doc, setDoc } from "firebase/firestore/lite";


export const startLoadingUsers = (id: string) => {
    return async (dispatch: Dispatch) => {
        const usersProfileList = await loadUsers();
        const userProfile = usersProfileList?.filter((u) => u?.id === id )
        dispatch(setUser(userProfile[0]))
    }
}


export const startAddToCart = (product: productType) => {
  return async (dispatch: Dispatch, getState: () =>  RootState) => {
    try {
      const { id: userId } = getState().auth;
      const { cart } = getState().user;
      const docRef = doc( FirebaseDb,'users',`${userId}`);
      await setDoc(docRef, { id: userId, cart}, {merge:true});
      dispatch(addToCart(product));
    } catch (error) {
      console.error(error);
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