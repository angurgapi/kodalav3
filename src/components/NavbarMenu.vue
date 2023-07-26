<template>
  <div class="absolute top-30 p-2 rounded bg-white shadow" @click="logOut">
    <ul>
      <li>
        <RouterLink to="/profile"> Profile </RouterLink>
      </li>
      <li>
        <button>Log out</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { nextTick } from "vue";
import { useAuthStore } from "@/stores/authStore";

const emit = defineEmits(["close"]);

const authStore = useAuthStore();
const logOut = () => {
  authStore.logOut();
  emit("close");

  nextTick(() => {
    router.push("/");
  });
};
</script>
