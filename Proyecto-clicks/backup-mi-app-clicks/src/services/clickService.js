import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

// Lee los clics del usuario (por uid)
export async function getUserClicks(uid) {
  const docRef = doc(db, "clicks", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().count || 0;
  } else {
    return 0;
  }
}

// Incrementa el contador de clics para el usuario
export async function incrementUserClicks(uid, amount = 1, email = "") {
  const docRef = doc(db, "clicks", uid);
  try {
    // Intenta hacer update incrementando el campo count
    await updateDoc(docRef, {
      count: increment(amount),
      email: email,
    });
  } catch (e) {
    // Si no existe el doc, lo crea con count = amount
    await setDoc(docRef, { count: amount, email: email });
  }
}

export async function getAllClicks() {
  const clicksCol = collection(db, "clicks");
  const q = query(clicksCol, orderBy("count", "desc"));
  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ uid: doc.id, ...doc.data() });
  });
  return results;
}