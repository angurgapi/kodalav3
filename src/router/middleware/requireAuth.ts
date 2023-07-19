import { getMe } from "@/api/authApi";
import type { NavigationGuardNext } from "vue-router";
import router from "..";

export default async function requireAuth({
  next,
  authStore,
}: {
  next: NavigationGuardNext;
  authStore: any;
}) {
  try {
    const user = await getMe();
    // const user = response.data;
    authStore.setAuthUser(user);

    if (!user) {
      return next({
        name: "auth",
      });
    }
  } catch (error) {
    document.location.href = "/auth";
  }

  return next();
}
