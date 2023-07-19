<template>
  <header class="h-[48px] z-100 flex w-full justify-between">
    <RouterLink to="/">
      <logo alt="logo" class="logo" height="32" width="32" />
    </RouterLink>

    <nav class="flex justify-end p-2 items-center">
      <LocaleSwitcher />

      <RouterLink v-if="user" class="mx-2" to="/profile">
        {{ user.name }}
      </RouterLink>
      <RouterLink v-else class="mx-2" to="/auth">
        {{ $t("Navbar.signIn") }}
      </RouterLink>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import logo from "@/assets/icons/logo.svg?component";
import { logoutUser } from "@/api/authApi";
import { useMutation } from "vue-query";
import { useAuthStore } from "@/stores/authStore";

const userStore = useAuthStore();
const user = userStore.authUser;
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

nav a.router-link-exact-active {
  text-shadow: #a1dce5 1px 0 3px;
  opacity: 0.8;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  color: #4b83a6;
}

nav a:first-of-type {
  border: 0;
}
</style>
