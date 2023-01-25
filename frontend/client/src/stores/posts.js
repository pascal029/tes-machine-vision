import { defineStore } from "pinia";
import axios from "axios";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    basedUrl: `http://localhost:3000`,
    showModalPosts: false,
    posts: [],
    page: 1,
    limit: 8,
    pagination: 0,
    postId: null,
    post: {},
    clickedFrom: "",
  }),
  actions: {
    async handleError(error) {
      this.alert(error.response.data.message, "error");
      if (
        error.response.data.message == "Expired Token" ||
        error.response.data.message == "invalid token"
      ) {
        await localStorage.removeItem("token");
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
        this.handleError(error);
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
        this.router.push("/post");
      } catch (error) {
        this.handleError(error);
      }
    },
    async deletePost(id) {
      try {
        const { data } = await axios({
          url: `${this.basedUrl}/post/${id.id}`,
          method: "delete",
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        this.alert(data.message, "success");
      } catch (error) {
        this.handleError(error);
      }
    },
    async getPost(id) {
      try {
        const { data } = await axios({
          url: `${this.basedUrl}/post/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        this.post = data.data;
      } catch (error) {
        this.handleError(error.response.data.message, "error");
      }
    },
    async editPost(dataEdit) {
      try {
        const { data } = await axios({
          url: `${this.basedUrl}/post/${dataEdit.id}`,
          method: "put",
          data: dataEdit,
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        });
        this.alert(data.message, "success");
        await this.renderPost({ page: 1, limit: 8 });
      } catch (error) {
        this.handleError(error.response.data.message, "error");
      }
    },
  },
});
