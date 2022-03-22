import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
//Test
const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore document reference
  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      // Make sure doc exists
      if (doc.data()) {
        document.value = { ...doc.data(), id };
        // update values
        error.value = null;
      } else {
        error.value = "That document does not exist";
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
