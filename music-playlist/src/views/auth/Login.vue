<template>
  <form @submit.prevent="handleSubmit">
    <label> Email:</label>
    <input type="email" required placeholder="Email" v-model="email" />

    <label> Password:</label>
    <input type="password" required placeholder="Password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../../composables/useLogin";
export default {
  name: "Login",
  setup(props, context) {
    // Pull out error,isPending and login function from useLogin composable
    const { error, isPending, login } = useLogin();

    // Refs binded to form input fields
    const email = ref("");
    const password = ref("");

    // Async function to handle form submissions and login the user
    const handleSubmit = async () => {
      console.log({
        Email: email.value,
        PS: password.value,
      });
      // Await the login function
      await login(email.value, password.value);
      // Check if there is not a value for error, if no error, emit a custom event, notifiying the parent component that a user has logged in
      if (!error.value) {
        context.emit("login");
      }
    };
    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style></style>
