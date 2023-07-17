import { initializeApp } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const getClients = async () => {};

export const createClient = async (payload) => {
  try {
    const ref = await addDoc(collection(db, "clients"), payload);
    return { data: ref.id, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
