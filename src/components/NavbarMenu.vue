<template>
  <div class="absolute top-30 p-2 rounded bg-white shadow">
    <ul>
      <li>
        <RouterLink to="/profile"> Profile </RouterLink>
      </li>
      <li>
        <button @click="logOut">Log out</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const logOut = () => {
  authStore.logOut();
};
</script>
