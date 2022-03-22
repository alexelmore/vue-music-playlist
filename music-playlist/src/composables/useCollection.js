import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useCollection = (collection) => {
 // Set error and isPending to refs with an initial value of null and false
const error = ref(null);
const isPending = ref(false);
  // Function that takes in a doc as an argument and then adds it to the collection
  const addDoc = async (doc) => {
   // Reset error and isPending values to their default
   error.value = null;
   isPending.value = true;
    try {
      const res = await projectFirestore.collection(collection).add(doc);
      isPending.value = false
      return res
    } catch (err) {
      error.value = err.message;
      isPending.value = false
    }
  };
  return { error, addDoc,isPending };
};
export default useCollection;
