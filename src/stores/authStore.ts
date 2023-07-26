import type { IUser } from "@/api/types";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";

export type AuthStoreState = {
  user: IUser | null;
};

export const useAuthStore = defineStore({
  id: "authStore",
  state: () =>
    ({
      user: null,
    } as AuthStoreState),
  getters: {},
  actions: {
    setAuthUser(payload: IUser | null) {
      console.log("setting user", payload);
      this.user = payload;
    },
    logOut() {
      const cookies = useCookies(["token"]);
      console.log("removing user");
      this.user = null;
      cookies.remove("token");
      console.log(this.user);
    },
  },
  persist: true,
});
