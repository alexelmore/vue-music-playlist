import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

// Set error to a ref with an initial value of null
const error = ref(null);

// Function that attempts to log a user in
const login = async (email, password) => {
  // Reset error value to its default of null
  error.value = null;
  // try to authorize user with Firebase projectAuth service
  try {
    // Pass in email and password and store the returned response from projectAuth in a const
    const response = await projectAuth.signInWithEmailAndPassword(
      email,
      password
    );
    // Reset error value to its default of null
    error.value = null;
    // Return the response
    return response;
  } catch (err) {
    console.log(err.message);
    error.value = "Invalid login credentials";
  }
};

// Function that is exported and returns our error property and our login function.
const useLogin = () => {
  return { error, login };
};
export default useLogin;
