<template>
  <div class="page page--fullpage lesson pt-10">
    <Loader v-if="isLoading" />
    <div v-else>
      <div class="lesson__data card">
        <h2>{{ lessonData.title }}</h2>
        <div
          v-for="letter in lessonData.letters"
          :key="letter.id"
          class="letter"
        >
          <span class="letter__value"
            >{{ letter.value }} ({{ letter.transliteration }})</span
          >
          <div class="letter__details f-row">
            {{ letter[locale] }}
          </div>
        </div>
      </div>

      <div v-if="illustratedWords">
        <Swiper
          loop
          :pagination="true"
          class="swiper-container"
          :modules="modules"
        >
          <SwiperSlide v-for="word in illustratedWords" :key="word.id">
            <Polaroid
              :img="word.image_url"
              :label="word.value"
              :royalty="word.img_royalty"
            />
          </SwiperSlide>
        </Swiper>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>
<!-- 
<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import WordGuess from '@/components/lessons/WordGuess'
import Firework from '@/components/lessons/Firework'
import PaginationBtns from '@/components/elements/PaginationBtns'
import LetterSlice from '@/components/lessons/LetterSlice'
import { mapState } from 'vuex'

export default {
  name: 'LessonPage',
  components: { WordGuess, PaginationBtns, Firework, LetterSlice },

  data: () => ({
    isLoading: true,
    swiper: null,
    isSoundOn: true,
    lessonNailedWords: 0,
    isLessonComplete: false,
    showFireworks: false,
    lesson: {}
  }),

  async fetch() {
    await this.getLessonData()
  },
  computed: {
    ...mapState('authorization', ['user']),
    ...mapState('links', ['links']),

    locale() {
      return this.$i18n.locale
    },

    getDescription() {
      return this.lesson[this.locale] || null
    },

    hasCompletedRecord() {
      return (
        this.$auth.loggedIn &&
        this.user &&
        this.user.completedLessons.includes(+this.$route.params.id)
      )
    }
  },
  watch: {
    lessonNailedWords(newVal) {
      if (newVal === this.words.length) {
        this.isLessonComplete = true
        this.congratulateUser()
      } else {
        this.isLessonComplete = false
      }
    },
    isLoading(newVal) {
      if (!newVal && this.lesson.images.length) {
        this.initSwiper()
      }
    }
  },

  methods: {
    async getLessonData() {
      // this.isLoading = true
      try {
        const { data } = await this.$axios.get(
          `/lesson/?order_num=${this.$route.params.id}`
        )
        this.lesson = data[0]
        this.lesson.images = data[0].words
          .filter((word) => {
            return word.image_url
          })
          .map((word) => {
            return {
              label: word.value,
              url: word.image_url,
              royalty: word.img_royalty
            }
          })
      } catch (e) {
        // console.log(e)
        return this.$nuxt.error(e)
      }

      // this.isLoading = false
    },

    initSwiper() {
      Swiper.use([Navigation, Pagination, Autoplay])
      this.$nextTick(() => {
        this.swiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,
          modules: [Navigation, Pagination, Autoplay],
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          draggable: true,

          autoplay: {
            delay: 3000
          }
        })
      })
    },

    congratulateUser() {
      const inputs = document.querySelectorAll('input')
      inputs.forEach((input) => input.blur())
      this.showFireworks = true
      setTimeout(() => (this.showFireworks = false), 4000)
      if (this.isSoundOn) {
        let audio = new Audio('sounds/trumpet.mp3')
        audio.volume = 0.7
        audio.play()
      }
      if (this.user) {
        this.addCompletedLesson()
      }
    },
    async addCompletedLesson() {
      try {
        const user = await this.$axios.patch(`/user/${this.user.id}`, {
          lessonNum: +this.$route.params.id
        })
        console.log(user)
      } catch (e) {
        console.log(e)
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  },
  beforeDestroy() {
    this.swiper = null
  }
}
</script> -->
<script setup lang="ts">
import { useQuery, useQueryClient } from "vue-query";
import { ref, onMounted, nextTick, computed } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { getLessonData } from "@/api/lessonApi";
import { useRoute } from "vue-router";
import Loader from "@/components/Loader.vue";

import { useLang } from "@/composables/useLang";
import ILesson from "@/types/lesson";
import Polaroid from "@/components/elements/Polaroid.vue";

const route = useRoute();
const orderNum = route.params.id[0];
const queryClient = useQueryClient();
const { t, locale } = useLang();

const lessonData = ref({});
const isLoading = ref(true);

const imgSrc = ref("");

const lessonQuery = useQuery("getLesson", () => getLessonData(orderNum), {
  retry: 1,
  onSuccess: (data) => {
    console.log("lesson: ", data);
    isLoading.value = false;
    lessonData.value = data as ILesson;
    // queryClient.refetchQueries("getPic");
  },
});

const swiperOptions = {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // Optional: Make the pagination bullets clickable
  },
};

const modules = [Pagination, Navigation];
// const picQuery = useQuery("getPic", () => getWordPicture("poppy"), {
//   retry: 1,
//   onSuccess: (data) => {
//     console.log(data);
//     imgSrc.value = data.photos[0].src.medium || "";
//   },
// });
onMounted(async () => {
  try {
    await queryClient.refetchQueries("getLesson");
  } catch (error) {
    console.error("Error fetching lesson:", error);
  }
});

const illustratedWords = computed(() => {
  return lessonData.value.words.filter((word) => word.image_url);
});
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100%;
  height: 100%;
  max-width: 1100px;

  &--fullpage {
    @media (max-width: 350px) {
      padding: 10px 0;
    }
  }

  @media (max-width: 380px) {
    padding: 14px;
  }
}
.swiper-container {
  max-width: 300px;
  @media (max-width: 400px) {
    max-width: 90vw;
  }
}

// .swiper-wrapper {
//   width: 100%;
//   max-width: 300px;
// }
.polaroid {
  max-width: 100%;
  height: auto;
}

.lesson {
  .tooltip {
    font-family: "PF";
    img {
      max-width: 60px;
    }
  }
}

// .swiper-pagination-bullets {
//   bottom: -5px;
// }
// .swiper-container {
//   height: 400px;
// }
</style>
