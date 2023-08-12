<template>
  <div class="wrapper">
    <NavBar />
    <div class="wrapper__content">
      <RouterView />
    </div>
    <FooterBlock />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<style lang="scss">
.wrapper {
  // background: url('~/assets/bgg.jpg');
  // background-color: rgb(243, 244, 245);
  background: linear-gradient(
    238deg,
    rgba(72, 91, 166, 16%) 0%,
    rgba(244, 195, 34, 16.3%) 50%,
    rgba(238, 115, 7, 16%) 100%
  );
}
</style>
