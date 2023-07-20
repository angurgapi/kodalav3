<template>
  <div ref="switcher" class="locale-switcher flex flex-col mr-2">
    <button class="text-[#4b83a6]" @click="isMenuOpen = !isMenuOpen">
      <!-- {{ currentLocale.iso }} -->
      <Globe class="globe" height="22" width="22" />
    </button>
    <div
      v-show="isMenuOpen"
      class="locale-switcher__menu p-0 shadow-md bg-white rounded"
    >
      <ul class="w-full p-0">
        <li
          v-for="option in localeOptions"
          :key="option.iso"
          class="w-full px-2 py-1 hover:bg-slate-100"
          :class="{ 'text-indigo-400': currentLocale.iso === option.iso }"
        >
          <button class="navbar__btn w-full" @click="toggleLocale(option.iso)">
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
import Globe from "@/assets/icons/globe.svg?component";

const lang = useLang();

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
    left: -5px;
    top: 30px;
  }
}

.globe {
  fill: #4b83a6;
}
</style>
