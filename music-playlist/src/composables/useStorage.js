import { projectStorage } from "../firebase/config";
import getUser from "../composables/getUser";
import { ref } from "vue";

// Get access to the current user by pulling out the user ref property from our getUser composable
const { user } = getUser();

const useStorage = () => {
  /* Refs */
  // Set error to a default value of null
  const error = ref(null);
  // Set URL to a default value of null
  const url = ref(null);
  // Set filePath to a default value of null
  const filePath = ref(null);

  // Function that will upload our image
  const uploadImage = async (file) => {
    // File path which is where we want to store our image in FB storage
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    // Create a storage reference
    const storageRef = projectStorage.ref(filePath.value);
    // Upload the file using the put method
    try {
      // Response object that is store the results of uploading the file
      const response = await storageRef.put(file);
      // Set file ref to the returned download URL
      url.value = response.ref.getDownloadURL();
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    url,
    filePath,
    error,
    uploadImage,
  };
};

export default useStorage;
