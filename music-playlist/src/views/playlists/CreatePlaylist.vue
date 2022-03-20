<template>
  <form @submit.prevent="handleSubmit">
    <h4>Add A New Playlist!</h4>

    <input type="text" placeholder="Playlist Title" required v-model="title" />

    <textarea required placeholder="Playlist Description" v-model="description" />

    <h4>Upload A Cover Image For Your Playlist</h4>
    <input type="file" required @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import useStorage from "../../composables/useStorage";
import { timestamp } from "@/firebase/config";

export default {
  name: "CreatePlaylist",
  setup(props, context) {
    // Pull out properties from useCollection, getUser and useStorage composables
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();
    const { url, filePath, uploadImage } = useStorage();

    // Refs set to form input fields and other UI states
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    // Function that handles form submissions
    const handleSubmit = async () => {
      if (file.value) {
        await uploadImage(file.value);
        console.log("Image uploaded, url:", url.value);
      }
    };

    // Allowed File types
    const types = ["image/png", "image/jpeg"];
    // Function that handles file uploads
    const handleChange = (e) => {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg format)";
      }
    };
    return {
      handleSubmit,
      title,
      description,
      fileError,
      isPending,
      handleChange,
    };
  },
};
</script>
<style>
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
