<template>
  <main class="wrapper w-full h-full">
    <NavBar />
    <div class="wrapper__content pt-[48px] flex justify-center">
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
  background: linear-gradient(
    238deg,
    rgba(72, 91, 166, 16%) 0%,
    rgba(244, 195, 34, 16.3%) 50%,
    rgba(238, 115, 7, 16%) 100%
  );
  min-height: 100vh;
}
</style>
