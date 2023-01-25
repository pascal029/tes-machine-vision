import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    baseUrl: `http://localhost:3000`,
    showModal: false,
  }),
  actions: {
    async renderHome() {
      const { data } = await axios({});
    },
  },
});
