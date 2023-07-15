<template>
  <header class="h-[48px] z-100 flex w-full justify-between">
    <!-- <LogoSVG alt="logo" class="logo" height="48" width="48" /> -->
    <div />
    <nav class="flex justify-end p-2 items-center">
      <LocaleSwitcher />
      <RouterLink to="/"> Home </RouterLink>
      <RouterLink class="ml-2" to="/about"> About </RouterLink>
      <span v-if="user" class="ml-2">{{ user.displayName }}</span>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
// import LogoSVG from "./assets/logo-pic.svg?component";
import { useUserStore } from "@/stores/user"; // Import the user store

const userStore = useUserStore();
const user = userStore.user;
console.log(user);

userStore.setUser({
  displayName: "Bob",
  email: "bob@blob",
});
console.log(user);
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 100;
  top: 0;
  backdrop-filter: blur(6px);
  background-color: rgba(234, 237, 240, 0.8);
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.3);
}
</style>
