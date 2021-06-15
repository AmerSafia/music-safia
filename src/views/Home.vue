<template>
  <div class="home">
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import ListView from "../components/ListView.vue";
export default {
  name: "Home",
  setup() {
    const { documents, error } = getCollection("playlists");
    return { documents, error };
  },
  components: {
    ListView,
  },
};
</script>
