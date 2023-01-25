import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import ChangePassword from "../views/ChangePassword.vue";
import Post from "../views/Post.vue";
import User from "../views/User.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/change-password",
    name: "changepassword",
    component: ChangePassword,
  },
  {
    path: "/post",
    name: "post",
    component: Post,
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.token ? true : false;

  if (to.name == "login" && isLoggedIn) {
    next("/");
  } else if (to.name == "register" && isLoggedIn) {
    next("/");
  } else if (
    (to.name == "home" ||
      to.name == "post" ||
      to.name == "post" ||
      to.name == "changepassword") &&
    !isLoggedIn
  ) {
    next("/login");
  } else {
    next();
  }
});
export default router;
