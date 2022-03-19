<template>
  <form @submit.prevent="handleSubmit">
    <h4>Add A New Playlist!</h4>

    <input type="text" placeholder="Playlist Title" required v-model="title" />

    <textarea
      required
      placeholder="Playlist Description"
      v-model="description"
    />

    <h4>Upload A Cover Image For Your Playlist</h4>
    <input type="file" required />
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";

export default {
  name: "CreatePlaylist",
  setup(props, context) {
    // Refs set to form input fields
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    // Pull out properties from useCollection and getUser composables
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    // Function that handles form submissions
    const handleSubmit = () => {
      console.log(title.value, description.value);
    };
    return { handleSubmit, title, description, fileError, isPending };
  },
};
</script>
<style>
form {
  background: white;
  border: 2px solid #7c8bff !important;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
form button {
  margin-top: 20px;
  display: block;
  margin: auto;
  min-width: 8rem;
}
</style>
