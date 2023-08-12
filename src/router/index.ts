import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";

import requireAuth from "@/router/middleware/requireAuth";
import middlewarePipeline from "@/router/middlewarePipeline";
import { useAuthStore } from "@/stores/authStore";
import HomeView from "../views/HomeView.vue";
import LessonPage from "../views/lessons/_id.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthPage.vue"),
    },
    {
      path: "/lesson/:id",
      name: "Lesson",
      component: LessonPage,
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/ProfilePage.vue"),
      meta: {
        middleware: [requireAuth],
      },
    },
    {
      path: "/cards",
      name: "Cards",
      component: () => import("../views/CardsPage.vue"),
      // meta: {
      //   middleware: [requireAuth],
      // },
    },
  ],
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore();

    if (!to.meta.middleware) {
      return next();
    }
    const middleware = to.meta.middleware as any;

    const context = {
      to,
      from,
      next,
      authStore,
    };

    return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1),
    });
  }
);

export default router;
