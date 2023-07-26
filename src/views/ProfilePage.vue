<template>
  <div class="page">
    profile page
    <template v-if="user">
      <div class="user-data">
        <span class="user-data__label">login</span> <span>{{ user.name }}</span>
        <span class="user-data__label">e-mail</span>
        <span>{{ user.email }}</span>
        <span class="user-data__label">role</span>
        <span>{{ user.role }}</span>
      </div>
      <div v-if="user.completedLessons.length" class="user-lessons f-column">
        <h4>{{ $t("lesson.completedLessons") }}</h4>
        <div class="user-lessons__lessons f-row">
          <div
            v-for="(lesson, index) in getSortedLessons"
            :key="index"
            class="card user-lessons__lesson"
          >
            {{ lesson }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const user = authStore.user;
console.log(user);

const getSortedLessons = computed(() => {
  return user?.completedLessons.toSorted() || [];
});
</script>

<style lang="scss" scoped>
.user-data {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 16px;
  &__label {
    text-align: right;
    font-weight: 600;
  }
}
.user-lessons {
  margin-top: 40px;
  &__lessons {
    margin-top: 20px;
  }
  &__lesson {
    &:not(:last-child) {
      margin-right: 14px;
    }
  }
}
</style>
