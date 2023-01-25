<script>
import { RouterView } from 'vue-router'
import { mapWritableState ,mapActions} from 'pinia';
import { useUserStore } from '../stores/user';
import { usePostsStore } from '../stores/posts';
export default {
  computed : {
    ...mapWritableState(useUserStore,['isLoggedIn' ])
  },
  methods : {
    ...mapActions(usePostsStore, ['renderHome', 'renderPost']),
    async goToHome (){
      await this.renderHome({page : 1, limit : 8})
      this.$router.push("/");
    },
    async goToPost (){
      await this.renderPost({page : 1, limit : 8})

      this.$router.push("/post");
    }
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
        <ul class="menu w-80 bg-base-100 gap-2 place-items-center text-base-content m-0 h-screen flex place-content-between">
          <!-- Sidebar content here -->
          <div class="border border-1 w-full flex flex-col w-full ">
            <div @click.prevent="goToHome" to="/" class="flex justify-center border border-1" active-class="active"><img src="../assets/icons8-home-page-50.png" style="height:1.7em"/></div>
            <router-link to="/user" class="flex justify-center border border-1" active-class="active">User</router-link>
            <router-link to="/change-password" class="flex justify-center border border-1" active-class="active">Change Password</router-link>
            <div @click.prevent="goToPost" to="/post" class="flex justify-center border border-1" active-class="active">Post</div>
          </div>
          <div class="flex justify-center place-items-end w-full">
            <div class="border border-1 w-full flex flex-row justify-center">
              <img src="../assets/logout.png" style="height:1em;margin-top:1%;margin-right:2%"/>
              <button>Logout</button>
            </div>
          </div>
        </ul>
        
      </div>
    </div>
</template>

<style scoped>

.active {
  background-color: skyblue;
}

.exact-active-link {
    font-weight: bold;
}</style>