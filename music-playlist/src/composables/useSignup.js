import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

// Set error and isPending to refs with an initial value of null and false
const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
  // Reset error and isPending values to their default
  error.value = null;
  isPending.value = true;

  // try to authorize user with Firebase projectAuth service
  try {
    // Pass in email and password and store the returned response from projectAuth in a const
    const response = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    // Confirm that there is a response, if no response, throw an error
    if (!response) {
      throw new Error("Could not complete the signup");
    }
    // if response, update displayName to the displayName value that the user entered in
    await response.user.updateProfile({ displayName });
    // Reset error and isPending values to to their default values
    error.value = null;
    isPending.value = false;
    // Return the response
    return response;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
