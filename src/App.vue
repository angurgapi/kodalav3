<template>
  <main class="wrapper w-full h-full">
    <NavBar />
    <div class="wrapper__content">
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";

// import LogoSVG from "./assets/logo-pic.svg?component";
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav a.router-link-exact-active {
  /* color: var(--color-text); */
  color: #04265e;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

.wrapper {
  @apply lg:min-h-screen;
  min-height: 100vh;
  &__content {
    padding-top: 48px;
  }
}
</style>
