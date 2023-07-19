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
.wrapper {
  @apply lg:min-h-screen;
  min-height: 100vh;
  &__content {
    padding-top: 48px;
  }
}
</style>
