<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Displayname" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button>Sign up</button>
  </form>
</template>

<script>
import { useRouter } from "vue-router";
import useSignup from "../../composables/useSignup";
import { ref } from "vue";
export default {
  setup() {
    const { error, signup } = useSignup();
    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        router.push({
          name: "UserPlaylists",
        });
      }
    };
    return { email, password, displayName, error, handleSubmit };
  },
};
</script>

<style></style>
