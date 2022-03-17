import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useCollection = (collection) => {
  // Set error to a default value of null
  const error = ref(null);
  // Function that takes in a doc as an argument and then adds it to the collection
  const addDoc = async (doc) => {
    error.value = null;
    try {
      await projectFirestore.collection(collection).add(doc);
    } catch (err) {
      error.value = err.message;
    }
  };
  return { error, addDoc };
};
export default useCollection;
