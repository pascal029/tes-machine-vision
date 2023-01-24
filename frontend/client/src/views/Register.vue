<script>
import { mapActions } from "pinia";
import {useUserStore} from '../stores/user'
export default {
  data(){
    return {
      name : '',
      username : '',
      email : '',
      password : '',
      confirmPassword : '',
      photo : null,
      File: null, 
      value: null, 
      processing : false,
    }
  },
  methods : {
    ...mapActions(useUserStore,['register']),
    handleImage(e){
      this.File = e.target.files[0];
      this.submitFile()
    },
    async submitFile() {

      this.processing = 'trigerred'
      const storage = await firebase.storage().ref().child(`${this.File.name}`);
      const storageRef = await storage.put(this.File);
        
      storage.getDownloadURL().then((res) => {
        this.photo = res
        this.processing = false
      });
    },
  }
}
</script>
<template>
    <section class="h-screen">
  <div class="container px-6 py-12 h-full">
    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <div class="flex justify-center items-center text-xl font-bold mb-10">Register</div>
        <form>
          <div class="mb-6 ">
            <input
              type="text"
              class="form-control text-center block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Name"
              v-model="name"
            />
          </div>
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
              type="text"
              class="form-control text-center block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              v-model="email"
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
          <div class="mb-6">
            <input
              type="password"
              class="form-control text-center block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
            <p style="color : red" v-if="(this.password && this.confirmPassword) && this.password != this.confirmPassword">Password did not match</p>
            <p style="color : green" v-if="(this.password && this.confirmPassword) && this.password == this.confirmPassword">Password match</p>
          </div>
          <div class="mb-6">
            <input @change="handleImage" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept=".jpg,.jpeg,.png">
          </div>
          <div v-if="processing != false">processing, please wait ...</div>
          <div class="mb-6">
            <img v-if="photo" :src="photo" style="width: 300px; height : 300px"/>
          </div>
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            @click.prevent="register({photo,email,name,username,password, confirmPassword})"
          >
            Register
          </button>
        </form>
        <div class="flex justify-center mt-4">
          <p>Already have an account ? <RouterLink to='/login'>Login Here</RouterLink></p> 
        </div>
      </div>
    </div>
  </div>
</section>
</template>