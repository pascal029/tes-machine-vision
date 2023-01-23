import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    baseUrl: `http://localhost:3000`,
  }),
  actions: {},
});
