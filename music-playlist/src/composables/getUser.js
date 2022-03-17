import { ref } from "vue";
import { projectAuth } from "../firebase/config";

// Init user, setting it to a ref with an arrgument of projectAuth.currentUser (this is the object that we use to interact with the firebase authentication service)
const user = ref(projectAuth.currentUser);

// listen for auth changes outside of function
// so only 1 listener is ever attached
projectAuth.onAuthStateChanged((_user) => {
  console.log("User state change. Current user is:", _user);
  user.value = _user;
});

// Funtion that return our user constant above and then is exported as the default
const getUser = () => {
  return { user };
};

export default getUser;
