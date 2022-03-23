<template>
  <div>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="playlist-details" v-if="playlist">
      <div class="playlist-info">
        <div class="cover">
          <img :src="playlist.coverUrl" />
        </div>
        <h2>{{ playlist.title }}</h2>
        <p class="username">Created by {{ playlist.userName }}</p>
        <p class="description">{{ playlist.description }}</p>
        <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
      </div>
      <!-- song list -->
      <div class="song-list">
        <div v-if="!playlist.songs.length">
          <i>{{ playlist.title }}</i> is currently empty.
        </div>
        <div v-else>
          <h2 class="song-list-header">Track Listing</h2>
          <div
            v-for="(song, index) in playlist.songs"
            :key="song.id"
            class="single-song"
          >
            <div class="details">
              <h3>
                <span class="song-list-number">{{ index + 1 }}.</span>
                {{ song.title }}
              </h3>
              <p>
                {{ song.artist }}
              </p>
            </div>
            <button v-if="ownership" @click="handleClick(song.id)">
              delete
            </button>
          </div>
        </div>

        <AddSong :playlist="playlist" v-if="ownership" />
      </div>
    </div>
  </div>
</template>

<script>
import getDocument from "../../composables/getDocument";
import getUser from "../../composables/getUser";
import useDocument from "../../composables/useDocument";
import useStorage from "../../composables/useStorage";
import AddSong from "../../components/AddSong.vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
export default {
  name: "PlaylistDetails",
  props: ["id"],
  components: { AddSong },
  setup(props) {
    // Init and pull the necessary properties from our getDocument, useDocument, getUser and useStorage composables
    const { document: playlist, error } = getDocument("playlists", props.id);
    const { deleteDocument, updateDocument } = useDocument(
      "playlists",
      props.id
    );
    const { user } = getUser();
    const { deleteImage } = useStorage();

    // Init router
    const router = useRouter();

    error.value = null;

    // Computed property to check if playlist was created by current logged in user
    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    // Function that handles deleting a playlist
    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDocument();
      router.push({ name: "home" });
    };

    const handleClick = async (id) => {
      const songs = playlist.value.songs.filter((song) => song.id != id);
      await updateDocument({ songs });
    };

    return {
      ownership,
      error,
      playlist,
      handleDelete,
      handleClick,
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
.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  padding: 0.5rem;
}
.details p {
  padding-left: 1rem;
  font-style: italic;
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
.song-list-header {
  color: #4f515a;
  text-decoration: underline;
}
.song-list-number {
  color: #4f515a;
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
