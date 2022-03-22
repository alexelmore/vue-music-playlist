<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add A New Song To Your Playlist</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add Song</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useDocument from "../composables/useDocument";
export default {
  name: "AddSong",
  props: ["playlist"],
  setup(props) {
    // Init refs and set them to form inputs and showForm boolean
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);

    // Init and pull the deleteDocument function from our useDocument composable
    const { updateDocument } = useDocument("playlists", props.playlist.id);

    // Function that handles adding a new song to a playlist
    const handleSubmit = async () => {
      // New song object
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000),
      };
      // Store the call to the updateDoc in constant, passing the function an object with our the current songs and our new song
      const res = await updateDocument({
        songs: [...props.playlist.songs, newSong],
      });
      // Reset title and artist values back their default values
      title.value = "";
      artist.value = "";
    };
    return { title, artist, showForm, handleSubmit };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
