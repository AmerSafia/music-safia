<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist discription ..."
      v-model="description"
    ></textarea>
    <label> Upload playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ ErrorFile }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else-if="isPending" disabled>Save...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "../../composables/useStorage";
import getUser from "../../composables/getUser";
import { timestamp } from "../../firebase/config";
import useCollection from "../../composables/useCollection";

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();

    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const ErrorFile = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          console.log("playlist added");
        }
      }
    };

    // allowed file types
    const types = ["image/jpeg", "image/png"];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        ErrorFile.value = null;
      } else {
        file.value = null;
        ErrorFile.value = "please select image file (png or jpeg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      ErrorFile,
      isPending,
    };
  },
};
</script>

<style scoped>
form {
  background: white;
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
button {
  margin-top: 20px;
}
</style>
