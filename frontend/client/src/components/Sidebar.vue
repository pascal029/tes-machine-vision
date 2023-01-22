<script>
import { RouterView } from 'vue-router'
export default {
  data () {
    return {
      isLoggedIn : localStorage.access_token ? true : false
    }
  }
}
</script>

<template>
    <div class="drawer drawer-mobile" >
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col ">
        <!-- Page content here -->
        <div class="btn btn-primary lg:hidden">Open drawer</div>
        <RouterView />
      
      </div> 
      <div class="drawer-side" v-if="isLoggedIn == true">
        <label for="my-drawer-2" class="drawer-overlay"></label> 
        <ul class="menu p-4 w-80 bg-base-100 text-base-content">
          <!-- Sidebar content here -->
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/user">User</RouterLink>
          <RouterLink to="/change-password">Change Password</RouterLink>
          <RouterLink to="/post">Post</RouterLink>
        </ul>
      </div>
    </div>
</template>