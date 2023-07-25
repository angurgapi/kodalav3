<script setup lang="ts">
import { getAllLessons } from "@/api/lessonApi";
import { useQuery, useQueryClient } from "vue-query";
import { ref, onMounted } from "vue";

const queryClient = useQueryClient();
const lessonsData = ref([]);

const lessonsQuery = useQuery("getLessons", () => getAllLessons(), {
  retry: 1,
  onSuccess: (data) => {
    console.log("lessons: ", data);
    lessonsData.value = data;
  },
});
onMounted(async () => {
  try {
    await queryClient.refetchQueries("getLessons");
  } catch (error) {
    console.error("Error fetching lessons:", error);
  }
});
</script>

<template>
  <div class="home">
    hooome page
    <span>{{ $t("Description") }}</span>
    <div>
      <ul v-if="lessonsData.length">
        <li v-for="(lesson, _id) in lessonsData" :key="_id" class="mt-2">
          {{ lesson.title }}
        </li>
      </ul>
      <span v-else>oops no lessons</span>
    </div>
  </div>
</template>
