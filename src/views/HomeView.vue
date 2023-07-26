<template>
  <div class="intro-page f-column">
    <!-- <template v-if="isLoading">
      <div>
        <img class="loader" src="img/khinkali.png" />
      </div>
    </template> -->

    <div class="banner flex flex-col">
      <div class="banner__title flex flex-col">
        <div class="banner__overlay" />
        <h2>გამარჯობა!</h2>
      </div>
    </div>
    <h1 class="intro-page__headline">
      {{ $t("Index.banner") }}
    </h1>
    <p class="intro-page__sub">
      {{ $t("Index.bannerSub") }}
    </p>
    <div class="intro-page__about">
      <section class="intro-page__section f-column">
        <h2 class="intro-page__subheader">
          {{ $t("Index.description.title") }}
        </h2>
        <div class="intro-page__motivation">
          <ReasonCard
            v-for="(reason, index) in reasons"
            :key="index"
            class="intro-page__card card"
            :card="reason"
          />
          <!-- <span v-for="(reason, index) in reasons" :key="index">{{
            reason.text
          }}</span> -->
        </div>
      </section>

      <section class="intro-page__section f-column">
        <h2 class="intro-page__subheader">
          {{ $t("Index.process.title") }}
        </h2>

        <!-- <div class="intro-page__stages">
            <div v-for="(card, index) in stages" :key="`stage-${index}`">
              <IntroCard :card="card" />
            </div>
          </div> -->

        <!-- <div v-else class="swiper-container">
            <div class="swiper-wrapper">
              <div
                v-for="(card, index) in stages"
                :key="`stage-${index}`"
                class="swiper-slide"
              >
                <IntroCard :card="card" />
              </div>
            </div>

            <div class="swiper-pagination" />
          </div> -->
      </section>

      <section class="intro-page__section f-column">
        <h2 class="intro-page__subheader">
          {{ $t("Index.work") }}
        </h2>
        <div class="intro-page__process">
          <!-- <svg-image name="elearning" /> -->

          <ul v-if="lessonsData" class="intro-page__links">
            <li v-for="link in lessonsData" :key="link.order_num">
              <RouterLink
                class="lesson-link f-row"
                :to="`/lesson/${link.order_num}`"
              >
                <span class="lesson-link__title">
                  {{ $t("Navbar.lesson") }} {{ link.order_num }}:</span
                >
                <p class="lesson-link__description">
                  <!-- буквы -->
                  <!-- <span
                      v-for="(letter, index) in getLessonLetters(link)"
                      :key="index"
                      class="lesson-link__letter"
                      >{{ letter }}</span
                    > -->
                </p>
              </RouterLink>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllLessons } from "@/api/lessonApi";
import { useQuery, useQueryClient } from "vue-query";
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import ReasonCard from "@/components/homepage/ReasonCard.vue";
import { useLang } from "@/composables/useLang";

const { t } = useLang();

const queryClient = useQueryClient();
const lessonsData = ref([]);

const reasons = computed(() => {
  return [
    {
      text: t("Index.description.blocks[0]"),
      image: "images/landscape.png",
    },
    {
      text: t("Index.description.blocks[1]"),
      image: "images/waiting.png",
    },
    {
      text: t("Index.description.blocks[2]"),
      image: "images/street.png",
    },
  ];
});

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

<style lang="scss">
.banner {
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  color: rgb(217, 122, 67);
  background-image: url("/public/images/bg1.png");
  background-position: center top;
  background-size: cover;
  background-color: rgba(75, 131, 166, 60%);

  &__overlay {
    position: absolute;
    top: 0;
    z-index: 100;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background-color: rgba(234, 237, 240, 30%);
    opacity: 0.7;
    backdrop-filter: blur(16px);
  }

  &__title {
    position: relative;
    z-index: 110;
    align-items: center;
    border-radius: 10px;
    padding: 10px 20px;
    width: fit-content;
  }

  h2 {
    z-index: 110;
    font-family: "Dejavu";
    font-weight: 700;
    font-size: 50px;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 5px #fff;
    text-transform: uppercase;

    @media (max-width: 800px) {
      font-size: 30px;
    }
  }
}

.intro-page {
  &__motivation {
    width: 100%;
    display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(220px, 300px));
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    grid-gap: 14px;
    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      .card:nth-child(3) {
        max-width: 450px;
        grid-column: span 2; /* Span 2 columns */
        justify-self: center; /* Horizontally center the third card */
      }
    }
    @media (max-width: 550px) {
      grid-template-columns: 1fr;
      .card:nth-child(3) {
        grid-column: span 1;
      }
    }
  }
}
</style>
