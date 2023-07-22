<template>
  <div class="page page--fullwidth lesson pt-10">
    <Loader v-if="isLoading" />
    <div v-else>
      {{ lessonData.title }}
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
import { ref, onMounted } from "vue";
import { getLessonData } from "@/api/lessonApi";
import { useRoute } from "vue-router";
import Loader from "@/components/Loader.vue";
import { getWordPicture } from "@/api/pexelsApi";

const route = useRoute();
const orderNum = route.params.id[0];
const queryClient = useQueryClient();

const lessonData = ref({}); // Create a ref with an object
const isLoading = ref(true);

const lessonQuery = useQuery("getLesson", () => getLessonData(orderNum), {
  retry: 1,
  onSuccess: (data) => {
    console.log("lesson: ", data);
    isLoading.value = false;
    lessonData.value = data;
    queryClient.refetchQueries("getPic");
  },
});

const picQuery = useQuery("getPic", () => getWordPicture("poppy"), {
  retry: 1,
  onSuccess: (data) => {
    console.log(data);
  },
});
onMounted(async () => {
  try {
    await queryClient.refetchQueries("getLesson");
  } catch (error) {
    console.error("Error fetching lesson:", error);
  }
});
</script>

<style lang="scss">
.page {
  @media (max-width: 420px) {
    padding: 20px 0;
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
</style>
