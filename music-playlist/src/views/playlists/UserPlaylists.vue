<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="playlist">
      <ListView :playlists="playlist" />
    </div>
    <div v-if="!playlist.length"><h4>No Playlists...</h4></div>
    <router-link :to="{ name: 'createPlaylist' }" class="btn"
      >Create a New Playlist</router-link
    >
  </div>
</template>

<script>
import getCollection from "../../composables/getCollection";
import ListView from "../../components/ListView.vue";
import getUser from "../../composables/getUser";

export default {
  name: "UserPlaylists",
  components: { ListView },
  setup() {
    // Init and pull out necessary properties from our getCollection and getUser composables
    const { user } = getUser();

    const { documents: playlist, error } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return {
      playlist,
      error,
    };
  },
};
</script>

<style scoped>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  text-align: center;
}
h4 {
  text-align: center;
  margin-bottom: 30px;
}
.btn {
  margin-top: 20px;
  display: flex;
  width: fit-content;
  margin: auto;
}
</style>
