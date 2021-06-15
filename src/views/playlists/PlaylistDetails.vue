<template>
  <div v-if="error" class="error">
    {{ error }}
  </div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">created by {{ playlist.userName }}</p>
      <p class="username">
        {{ playlist.description }}
      </p>
      <button v-if="owner && !isPending" @click="handleDelete">
        delete playlist
      </button>
      <button v-if="isPending" disabled>deleting ...</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet.
      </div>
      <div
        v-else
        v-for="song in playlist.songs"
        :key="playlist.songs.id"
        class="single-song"
      >
        <div class="details">
          <h3 class="title">{{ song.title }}</h3>
          <p class="artist">{{ song.artist }}</p>
        </div>
        <button>delete</button>
      </div>
      <AddSong v-if="owner" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import useStorge from "../../composables/useStorage";
import getDocument from "../../composables/getDocument";
import getUser from "../../composables/getUser";
import useDocument from "../../composables/useDocument";
import { useRouter } from "vue-router";
import AddSong from "../../components/AddSong.vue";
export default {
  components: {
    AddSong,
  },
  props: ["id"],

  setup(props) {
    const router = useRouter();
    const { error, document: playlist } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { deleteImg } = useStorge();
    const owner = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const { isPending, deleteDoc } = useDocument("playlists", props.id);
    const handleDelete = async () => {
      await deleteImg(playlist.value.filePath);
      await deleteDoc();
      router.push({
        name: "Home",
      });
    };

    return { error, playlist, owner, handleDelete, isPending };
  },
};
</script>

<style>
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
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

.playlist-info p {
  margin-bottom: 20px;
}

.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.username {
  color: #999;
}

.description {
  text-align: left;
}
</style>
