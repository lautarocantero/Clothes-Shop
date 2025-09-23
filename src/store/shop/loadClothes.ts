import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDb } from "../../firebase/firebase";
import type { productType } from "../../LautyShop/pages/LautyShopPage/types/productTypes";


export const loadClothes = async () => {
  try {
    const collectionRef = collection(FirebaseDb, "Clothes");
    const docs = await getDocs(collectionRef);

    const clothes: productType[] = [];
    docs.forEach((doc) => {
       clothes.push({ id: doc.id, ...doc.data() } as productType);
     });
    return clothes;
  } catch (error) {
    console.error("Error al cargar ropa:", error);
    throw error;
  }
};