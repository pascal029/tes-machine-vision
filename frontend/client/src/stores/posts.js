import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    basedUrl: `http://localhost:3000`,
    showModal: false,
    posts: [],
    page: 1,
    limit: 8,
    pagination: 0,
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
    async renderHome(params) {
      try {
        const { data } = await axios({
          url: this.basedUrl + "/post",
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
          params: params,
        });
        this.posts = await data.data;
        this.router.push("/");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    async renderPost(params) {
      try {
        const user = await axios({
          url: `${this.basedUrl}/user`,
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        const id = user.data.data.id;
        const { data } = await axios({
          url: `${this.basedUrl}/post/user/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
          params: params,
        });
        this.posts = data.data;
        console.log(data);
        this.router.push("/post");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
