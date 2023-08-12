<template>
  <div class="polaroid flex flex-col items-center">
    <img class="polaroid__img" :src="img" />
    <span v-if="royalty" class="polaroid__royalty">©{{ royalty }}</span>
    <span class="polaroid__label" :style="`font-size: ${getFontSize}px;`">{{
      label
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  img: string;
  label?: string;
  royalty?: string;
}>();

const getFontSize = computed(() => {
  return props.label && props.label.length > 7 ? 30 : 40;
});
</script>

<style lang="scss" scoped>
.polaroid {
  position: relative;
  padding: 20px 20px 15px;
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 20%);
  cursor: pointer;
  background: #fff;
  max-height: 80vh;
  width: 100%;
  height: auto;
  aspect-ratio: 3/4;

  &__img {
    object-fit: cover;
    aspect-ratio: 1;
    display: flex;
    max-height: 80%;
  }

  &__label {
    margin-top: 10px;
    height: 60px;
    text-align: center;
    opacity: 0.9;
  }

  &__royalty {
    align-self: flex-end;
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.3;
  }
}
</style>
