<script>
import { RouterView } from 'vue-router'
import { mapWritableState } from 'pinia';
import { useUserStore } from '../stores/user';
export default {
  computed : {
    ...mapWritableState(useUserStore,['isLoggedIn'])
  }
}
</script>

<template>
    <div class="drawer drawer-mobile" >
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col ">
        <!-- Page content here -->
        <div class="w-32">
          <label for="my-drawer-2" class="btn btn-square btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <RouterView />
      
      </div> 
      <div class="drawer-side border border-1" v-if="isLoggedIn == true">
        <label for="my-drawer-2" class="drawer-overlay"></label> 
        <ul class="menu p-4 w-80 bg-base-100 gap-2 place-items-center text-base-content m-0">
          <!-- Sidebar content here -->
          <div class="border border-1 w-full flex justify-center">
            <RouterLink to="/">Home</RouterLink>
          </div>
          <div class="border border-1 w-full flex justify-center">
            <RouterLink to="/user">User</RouterLink>
          </div>
          <div class="border border-1 w-full flex justify-center">
            <RouterLink to="/change-password">Change Password</RouterLink>
          </div>
          <div class="border border-1 w-full flex justify-center">
            <RouterLink to="/post">Post</RouterLink>
          </div>

          
        </ul>
        <div class="flex justify-center place-items-end ">
          <div class="border border-1 w-full flex justify-center">

            <button>Logout</button>
          </div>
        </div>
      </div>
    </div>
</template>