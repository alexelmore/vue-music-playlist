<template>
  <div class="error" v-if="error">{{ error }}</div>
  <p>{{ selectedList }}</p>
</template>

<script>
import getCollection from "../../composables/getCollection";

import { computed } from "vue";
export default {
  name: "PlaylistDetails",
  props: ["id"],
  setup(props) {
    const { documents, error } = getCollection("playlists");
    console.log("d", documents);
    const selectedList = computed(() => {
      if (documents.value) {
        return documents.value.filter((doc) => doc.id === props.id);
      }
    });

    return {
      documents,
      error,
      selectedList,
    };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
