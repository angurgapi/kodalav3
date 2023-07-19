<template>
  <div>profile page</div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const user = authStore.authUser;
console.log(user);
</script>
