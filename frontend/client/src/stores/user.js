import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    basedUrl: `http://localhost:3000`,
  }),
  actions: {
    async register(registerData) {
      try {
        const { data } = await axios({
          url: `${this.basedUrl}/auth/register`,
          method: "post",
          data: registerData,
        });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async login(loginData) {
      try {
      } catch (error) {}
    },
  },
});
