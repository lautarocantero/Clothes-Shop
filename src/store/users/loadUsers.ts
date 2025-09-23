import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDb } from "../../firebase/firebase";

type UserType = {
  id: string;
  name: string;
  cart: {
    imagesUrl: string;
    price: number;
    size: string;
    stock: number;
    title: string;
    type: string;
  }[];
};

export const loadUsers = async () => {
  try {
    const collectionRef = collection(FirebaseDb, "users");
    const docs = await getDocs(collectionRef);

    const users: UserType[] = [];
    docs.forEach((doc) => {
       users.push({ id: doc.id, ...doc.data() } as UserType);
     });
    return users;
  } catch (error) {
    console.error("Error al cargar ropa:", error);
    throw error;
  }
};