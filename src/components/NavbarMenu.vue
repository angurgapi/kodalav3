<template>
  <div ref="menu" class="relative">
    <button @click="isMenuOpen = !isMenuOpen">
      {{ userName }}
    </button>
    <div
      v-show="isMenuOpen"
      class="absolute top-30 p-2 rounded bg-white shadow"
    >
      <ul @click="isMenuOpen = !isMenuOpen">
        <li>
          <RouterLink to="/profile"> Profile </RouterLink>
        </li>
        <li>
          <button @click="logOut">Log out</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { nextTick, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  userName: string;
}>();

const menu = ref(null);
const isMenuOpen = ref(false);

onMounted(() => {
  onClickOutside(menu, () => {
    isMenuOpen.value = false;
  });
});

const authStore = useAuthStore();
const logOut = () => {
  authStore.logOut();
  // isMenuOpen.value = false;

  nextTick(() => {
    router.push("/");
  });
};
</script>
