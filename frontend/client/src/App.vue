<script>
import { RouterView } from 'vue-router'
import Sidebar from "./components/Sidebar.vue"
import Login from "./views/Login.vue"
export default {
  components : {
    Sidebar,
    Login
  },
  data() {
    return {
      isLoggedIn : ''
    }
  },
  created () {
    this.isLoggedIn = localStorage.access_token ? true : false
  }
}
</script>

<template>
  <Sidebar />
</template>

<style >
</style>
