import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    basedUrl: `http://localhost:3000`,
    isLoggedIn: localStorage.token ? true : false,
    user: {},
    showModal: false,
    disabled: 0,
  }),
  actions: {
    handleError(error) {
      this.alert(error.response.data.message, "error");
      if (
        error.response.data.message == "Expired Token" ||
        error.response.data.message == "invalid token"
      ) {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.router.push("/login");
      }
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
    async logout() {
      try {
        const { data } = await axios({
          url: this.basedUrl + "/auth/logout",
          method: "post",
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        await localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.alert(data.message, "success");
      } catch (error) {
        this.handleError(error.response.data.message);
      }
    },
    async getUser() {
      try {
        const { data } = await axios({
          url: `${this.basedUrl}/user`,
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
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
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
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
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
          data: passwordData,
        });
        this.alert(data.message, "success");
      } catch (error) {
        this.handleError(error);
      }
    },
  },
});
