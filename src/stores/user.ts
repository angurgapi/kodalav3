import { defineStore } from "pinia";
import IUser from "../types/user";

export const useUserStore = defineStore({
  id: "user",
  state: (): { user: IUser | null } => ({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(payload: IUser) {
      this.user = payload;
    },
    logout() {
      this.user = null;
    },
  },
});
