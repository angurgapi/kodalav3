<template>
  <header class="header h-[48px] z-100 flex w-full justify-between">
    <RouterLink to="/">
      <!-- <logo alt="logo" class="logo mx-2" height="32" width="32" /> -->
      <img class="header__logo header__logo" src="/images/logo-pic.svg" />
      <img
        class="header__logo header__logo--desk"
        src="/images/logo-text.svg"
      />
    </RouterLink>

    <nav class="flex justify-end p-2 items-center">
      <LocaleSwitcher />
      <template v-if="user">
        <NavbarMenu :user-name="user.name" />
      </template>
      <template v-else>
        <RouterLink class="mx-2" to="/auth">
          {{ $t("Navbar.signIn") }}
        </RouterLink>
      </template>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import LocaleSwitcher from "@/components/LocaleSwitcher.vue";
import { useAuthStore } from "@/stores/authStore";
import NavbarMenu from "./NavbarMenu.vue";

const userStore = useAuthStore();

const user = computed(() => userStore.user);
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 100;
  top: 0;
  backdrop-filter: blur(6px);
  background-color: rgba(234, 237, 240, 0.8);
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  &__logo {
    height: 32px;
    margin-left: 16px;
    &--desk {
      height: 22px;
      margin-right: 10px;
      @media (max-width: 1000px) {
        display: none;
      }
    }
  }
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
  &:hover {
    background: none;
  }
}

nav a:first-of-type {
  border: 0;
}
</style>
