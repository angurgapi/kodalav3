<template>
  <div class="page py-3 flex flex-col">
    <div class="flex justify-center gap-2 tab-switcher">
      <button
        class="text-indigo-400"
        :class="{
          'text-indigo-900 border-indigo-900 border-solid border-b-2':
            mode === 'signIn',
        }"
        @click="mode = 'signIn'"
      >
        Sign in
      </button>
      <button
        class="text-indigo-400"
        :class="{
          'text-indigo-900 border-indigo-900 border-solid border-b-2':
            mode === 'signUp',
        }"
        @click="mode = 'signUp'"
      >
        Sign up
      </button>
    </div>
    <div class="card flex flex-col" />
    <LoginView v-if="mode === 'signIn'" />
    <RegisterView v-else />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginView from "@/components/auth/LoginView.vue";
import RegisterView from "@/components/auth/RegisterView.vue";
const mode = ref("signIn");
</script>
