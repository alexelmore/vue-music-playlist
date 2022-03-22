import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const useDocument = (collection, id) => {
  // Set error and isPending to refs with an initial value of null and false
  const error = ref(null);
  const isPending = ref(false);

  // Make a reference to our document that we want to delete
  let docRef = projectFirestore.collection(collection).doc(id)

  // Function that sends a delete request to Firebase
  const deleteDocument = async () => {
    // Reset is isPending and error values
    isPending.value = true;
    error.value = null;
    try {
      const response = await docRef.delete();
      isPending.value = false;
      return response;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "Could not delete the document"
    }
  };
  return { deleteDocument, isPending, error };
};

export default useDocument;
