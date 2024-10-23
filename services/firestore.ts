import { getDoc, addDoc, updateDoc, deleteDoc, setDoc, collection, doc, getDocs } from 'firebase/firestore';
// import { db } from '/';
import { db } from '@/app/firebaseConfig';

interface Items {
    id?: string;
    name: string;
    quantity: string;
}

const getUserPantryCollection = (userId: string) => collection(db, 'users', userId, 'pantry');

const addItem = async (userId: string, item:Items) => {
    const userPantryCollection = getUserPantryCollection(userId);
    await setDoc(doc(userPantryCollection), item);
    
}

const getItems = async (userId: string) => {
    const userPantryCollection = getUserPantryCollection(userId);
    const snapshot = await getDocs(userPantryCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Items[];
}

const updateItem = async (userId: string, id: string, updatedItem: Partial<Items>)=> {
    const itemDoc = doc(db, 'users', userId, 'pantry', id);
    await updateDoc(itemDoc, updatedItem);
}

const deleteItem = async (userId: string, id: string) => {
    const itemDoc = doc(db, 'users', userId, 'pantry', id);
    await deleteDoc(itemDoc)
}

export {addItem, updateItem, getItems, deleteItem  }