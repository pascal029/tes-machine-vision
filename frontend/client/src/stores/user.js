import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    basedUrl: `http://localhost:3000`,
    isLoggedIn: localStorage.token ? true : false,
    user: {},
    headers: {
      Authorization: "Bearer " + localStorage.token,
    },
    showModal: false,
  }),
  actions: {
    handleError(error) {
      this.alert(error.response.data.message);
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.router.push("/login");
    },
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

        this.alert(data.message, "success");
        this.router.push("/login");
      } catch (error) {
        this.alert(error.response.data.message, "error");
      }
    },
    async login(loginData) {
      try {
        const { data } = await axios({
          url: `${this.basedUrl}/auth/login`,
          method: "post",
          data: loginData,
        });
        localStorage.setItem("token", data.data.token);
        this.isLoggedIn = true;
        this.alert(data.message, "success");
        this.router.push("/");
      } catch (error) {
        this.alert(error.response.data.message, "error");
      }
    },
    async getUser() {
      console.log(this.headers);
      try {
        const { data } = await axios({
          url: `${this.basedUrl}/user`,
          headers: this.headers,
        });
        this.user = data.data;
      } catch (error) {
        this.handleError(error);
      }
    },
    async updateUser(updateData) {
      try {
        const { data } = await axios({
          url: this.basedUrl + "/user",
          method: "put",
          headers: this.headers,
          data: updateData,
        });
        this.user = data.data;
        this.alert(data.message, "success");
      } catch (error) {
        this.handleError(error);
      }
    },
    async updatePassword(passwordData) {
      try {
        const { data } = await axios({
          url: this.basedUrl + "/user/change-password",
          method: "put",
          headers: this.headers,
          data: passwordData,
        });
      } catch (error) {
        this.handleError(error);
      }
    },
  },
});
