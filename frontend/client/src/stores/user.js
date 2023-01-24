import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    basedUrl: `http://localhost:3000`,
  }),
  actions: {
    alert(message, status) {
      Swal.fire({
        position: "top-end",
        icon: status,
        title: message,
        toast: true,
        timerProgressBar: true,
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true,
      });
    },
    async register(registerData) {
      try {
        if (registerData.password != registerData.confirmPassword)
          throw {
            response: {
              data: { message: "Password did not match, please try again" },
            },
          };
        const { data } = await axios({
          url: `${this.basedUrl}/auth/register`,
          method: "post",
          data: registerData,
        });

        this.alert(data.message);
        this.router.push("/login");
      } catch (error) {
        this.alert(error.response.data.message, "error");
      }
    },
    async login(loginData) {
      try {
      } catch (error) {}
    },
  },
});
