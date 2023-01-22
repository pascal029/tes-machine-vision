import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    baseUrl: `http://localhost:3000`,
  }),
  actions: {
    async register(registerData) {
      try {
      } catch (error) {}
    },
    async login(loginData) {
      try {
      } catch (error) {}
    },
    async upLoadFile(imageBinary) {
      try {
      } catch (error) {}
    },
  },
});
