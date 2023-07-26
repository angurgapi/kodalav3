// import { getMe } from "@/api/authApi";
import { useAuthStore } from "@/stores/authStore";
import type { NavigationGuardNext } from "vue-router";

export default async function requireAuth({
  next,
  authStore,
}: {
  next: NavigationGuardNext;
  authStore: any;
}) {
  try {
    const user = authStore.user;

    if (!user) {
      return next({
        name: "auth",
      });
    }
  } catch (error) {
    // const authStore = useAuthStore();
    // authStore.logOut();
    document.location.href = "/auth";
  }

  return next();
}
