<script>
import { useUserStore } from '../stores/user';
import { mapActions,mapWritableState } from 'pinia';
import Modal from '../components/Modal.vue'
export default {
    components : {
        Modal
    },
    data(){
        return {
            File : null,
        }
    },
    computed : {
        ...mapWritableState(useUserStore, ['user', 'showModal', 'disabled'])
    },
    methods : {
        ...mapActions(useUserStore, ['getUser']),
        handleImage(e){
      this.File = e.target.files[0];
      this.submitFile()
    },
    async submitFile() {

      this.processing = 'trigerred'
      const storage = await firebase.storage().ref().child(`${this.File.name}`);
      const storageRef = await storage.put(this.File);
        
      storage.getDownloadURL().then((res) => {
        this.user.photo = res
        this.processing = false
      });
    },
    },
    async created(){
        await this.getUser()
    },
    
}
</script>

<template>
    <div class="container px-6 py-12 h-full">
    <div class="flex justify-center flex-wrap h-full g-6 text-gray-800">
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20 mt-10">
            <div class="flex justify-center mb-8 font-bold">Detail User</div>
            
            <form>
                <div class="flex flex-col gap-6 ">
                <div class="relative">
                    <input :disabled="disabled == 0" type="text" id="name" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" v-model="user.name"/>
                    <label for="name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75        top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0        peer-focus:scale-75 peer-focus:-translate-y-4">Name</label>
                </div>
                <div class="relative">
                    <input :disabled="disabled == 0" type="text" v-model="user.username" id="username" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75        top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0        peer-focus:scale-75 peer-focus:-translate-y-4">Username</label>
                </div>
                <div class="relative">
                    <input :disabled="disabled == 0" type="email" v-model="user.email" id="email" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75        top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0        peer-focus:scale-75 peer-focus:-translate-y-4">Email</label>
                </div>
                <div class="mb-6">
                <input :disabled="disabled == 0" @change="handleImage" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept=".jpg,.jpeg,.png">
              </div>
                <div class="flex justify-center place-items-center">
                    <img :src="user.photo" style="width: 250px; height : 250px"/>
                </div>
                <div class="flex gap-10 ml-10 pl-5 justify-center place-items-center">
                    <button @click.prevent="disabled == 0 ? disabled +=1 : disabled -= 1" class="btn btn-primary">{{disabled == 0 ? 'EDIT' : 'CANCEL'}}</button>
                    <button @click.prevent="showModal = true" :disabled="disabled == 0" for="my-modal" class="btn">SUBMIT</button>

                </div>
            </div>
            </form>

        
        </div>
        </div>
    </div>
    <Modal v-if="showModal"/>
</template>