<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user';
export default {
  data(){
    return {
      username : '',
      password : ''
    }
  },
  methods : {
    ...mapActions(useUserStore, ['login'])
  }
}
</script>

<template>
    <section class="h-screen">
  <div class="container px-6 py-12 h-full">
    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <div class="flex justify-center items-center font-bold text-xl mb-10">Login</div>
        <form @submit.prevent="login({username, password})">
          <div class="mb-6">
            <input
              type="text"
              class="form-control text-center block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Username"
              v-model="username"
            />
          </div>
          <div class="mb-6">
            <input
              type="password"
              class="form-control text-center block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Sign in
          </button>
        </form>
        <div class="flex justify-center">
          <p>Don't have an account ? <RouterLink to='/register'>Register Here</RouterLink></p> 
        </div>
      </div>
    </div>
  </div>
</section>
</template>