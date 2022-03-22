<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Playlist</h4>
      <input
        type="text"
        required
        placeholder="Playlist title"
        v-model="title"
      />
      <textarea
        required
        placeholder="Playlist description..."
        v-model="description"
      ></textarea>
      <!-- upload playlist image -->
      <label>Upload Playlist Cover Image</label>
      <input type="file" @change="handleChange" />
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
import { timestamp } from "@/firebase/config";
export default {
  setup() {
    // Init and pull out properties from our composables: useStorage, useCollection and getUser
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    // Init refs and assign them to our file inputs, our pending state and our error states
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    // Init router
    const router = useRouter();

    // Function that handles form submission
    const handleSubmit = async () => {
      // Check to see if a file has been uploaded first
      if (file.value) {
        // Reset isPending to true
        isPending.value = true;
        // Call uploadImage function and pass it our file value
        await uploadImage(file.value);
        // Call addDoc function and pass it our title value, description value, user id value, userName value, coverUrl value, filePath value, songs array and createdAt timestamp
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value, // so we can delete it later
          songs: [],
          createdAt: timestamp(),
        });
        // Set isPending to false
        isPending.value = false;
        if (!error.value) {
          console.log("playlist added");
          router.push({ name: "playlistDetails", params: { id: res.id } });
        }
      }
    };
    // allowed file upload types
    const types = ["image/png", "image/jpeg"];
    // Function that handles changes to our file upload input
    const handleChange = (e) => {
      let selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      fileError,
      handleChange,
      isPending,
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
