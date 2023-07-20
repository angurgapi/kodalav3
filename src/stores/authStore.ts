import type { IUser } from "@/api/types";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";

export type AuthStoreState = {
  authUser: IUser | null;
};

export const useAuthStore = defineStore({
  id: "authStore",
  state: () =>
    ({
      authUser: null,
    } as AuthStoreState),
  getters: {},
  actions: {
    setAuthUser(user: IUser | null) {
      this.authUser = user;
    },
    logOut() {
      const cookies = useCookies(["token"]);
      this.authUser = null;
      cookies.remove("token");
    },
  },
  persist: true,
});
