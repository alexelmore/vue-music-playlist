import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref(null);

const signup = async (email, password, displayName) => {
  // Set error value to a default of null
  error.value = null;

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
    // Reset the error value
    error.value = null;
    // Return the response
    return response;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
