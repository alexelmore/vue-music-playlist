import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

// Set error to a ref with an initial value of null
const error = ref(null);

// Function that trys to log a user out
const logout = async () => {
  // Reset error value to its default of null
  error.value = null;

  // try to log a user out with Firebase projectAuth service
  try {
    await projectAuth.signOut();
    // Reset error value to its default of null
    error.value = null;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

// Function that is exported and returns our error property and our logout function.
const useLogout = () => {
  return { error, logout };
};

export default useLogout;
