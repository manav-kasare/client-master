import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebaseConfig from "../data/firebase.json";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const getClients = async () => {
  try {
    const response = await getDocs(collection(db, "clients"));
    const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.message ? error.message : "Something went wrong!",
    };
  }
};

export const createClient = async (payload) => {
  try {
    const ref = await addDoc(collection(db, "clients"), payload);
    return { data: ref.id, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.message ? error.message : "Something went wrong!",
    };
  }
};
