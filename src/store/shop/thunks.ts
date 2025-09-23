import { type Dispatch } from "@reduxjs/toolkit"
import { FirebaseDb } from "../../firebase/firebase";
import { collection, getDocs, where, query, QueryConstraint  } from "firebase/firestore/lite";
import { setLoadingClothes, setClothes } from "./shopSlice";

export const startLoadingClothes = (
  filters: {
    type?: string;
    size?: string;
    searchParams?: string;
  } = {}
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingClothes(true));
      const clothesRef = collection(FirebaseDb, 'Clothes');

      const conditions: QueryConstraint[] = [
        ...(filters?.type ? [where('type', '==', filters.type)] : []),
        ...(filters?.size ? [where('size', '==', filters.size)] : []),
      ];

      const finalQuery = conditions.length > 0
        ? query(clothesRef, ...conditions)
        : query(clothesRef);

      const querySnapshot = await getDocs(finalQuery);

      const clothes = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((item: any) => {
          if (!filters.searchParams?.trim()) return true;

          const searchLower = filters.searchParams.toLowerCase();
          const title = (item?.title ?? '').toString().toLowerCase();
          return title.includes(searchLower);
        });
      dispatch(setClothes(clothes));
      dispatch(setLoadingClothes(false));
    } catch (error) {
      console.error('Error loading clothes:', error);
    }
  };
};