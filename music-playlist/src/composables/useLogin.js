import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

// Set error and isPending to refs with an initial value of null and false
const error = ref(null);
const isPending = ref(false);

// Function that attempts to log a user in
const login = async (email, password) => {
  // Reset error and isPending values to their default
  error.value = null;
  isPending.value = true;
  // try to authorize user with Firebase projectAuth service
  try {
    // Pass in email and password and store the returned response from projectAuth in a const
    const response = await projectAuth.signInWithEmailAndPassword(
      email,
      password
    );
    // Reset error and isPending values to to their default values
    error.value = null;
    isPending.value = false;
    // Return the response
    return response;
  } catch (err) {
    console.log(err.message);
    error.value = "Invalid login credentials";
    isPending.value = false;
  }
};

// Function that is exported and returns our error property and our login function.
const useLogin = () => {
  return { error, login, isPending };
};
export default useLogin;
