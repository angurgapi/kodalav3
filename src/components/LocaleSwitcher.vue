<template>
  <div ref="switcher" class="locale-switcher flex flex-col mr-2">
    <button class="navbar__btn" @click="isMenuOpen = !isMenuOpen">
      {{ currentLocale.iso }}
    </button>
    <div
      v-show="isMenuOpen"
      class="locale-switcher__menu p-2 shadow-md bg-white rounded-sm"
    >
      <ul>
        <li v-for="option in localeOptions" :key="option.iso">
          <button class="navbar__btn" @click="toggleLocale(option.iso)">
            {{ option.iso }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useLang } from "../composables/useLang";
import { onClickOutside } from "@vueuse/core";

const lang = useLang();
console.log(lang);
console.log(lang.locale);

const switcher = ref(null);
const isMenuOpen = ref(false);

const localeOptions = lang.availableLocales;

const currentLocale = computed(() => {
  return (
    lang.availableLocales.find(({ iso }) => iso === lang.locale.value) ||
    lang.availableLocales[0]
  );
});

const toggleLocale = (localeIso: string) => {
  lang.setLocale(localeIso);
  isMenuOpen.value = false;
};

onMounted(() => {
  onClickOutside(switcher, () => {
    isMenuOpen.value = false;
  });
});
</script>

<style lang="scss" scoped>
.locale-switcher {
  position: relative;
  &__menu {
    position: absolute;
    top: 30px;
  }
}
</style>
