<template>
  <div class="card">
    <img class="card__media" :src="card.image" />
    <p class="card__text" v-html="card.text" />
  </div>
</template>

<script setup lang="ts">
interface ICard {
  image: string;
  text: string;
}
const props = defineProps<{
  card: ICard;
}>();
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
  transition: 0.2s all ease-in-out;
  @media (min-width: 1000px) {
    &:hover {
      transform: scale(1.05);
    }
  }
  &__media {
    width: 100%;
    height: auto;
  }
  &__text {
    text-align: justify;
    margin-top: 16px;
  }
}
</style>
