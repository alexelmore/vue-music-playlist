<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="playlist">
      <ListView :playlists="playlist" />
    </div>
  </div>
</template>

<script>
import getCollection from "../../composables/getCollection";
import ListView from "../../components/ListView.vue";
import getUser from "../../composables/getUser";
// import useDocument from "../../composables/useDocument";
// import useStorage from "../../composables/useStorage";
// import { computed } from "vue";

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

<style></style>
