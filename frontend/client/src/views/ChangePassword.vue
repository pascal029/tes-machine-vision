<script>
import Modal from '../components/Modal.vue';
import { useUserStore } from '../stores/user';
import { mapWritableState } from 'pinia';
export default {
    components :{
        Modal
    },
    data(){
        return {
            password : '',
            newPassword : '',
            confirmNewPassword : ''
        }
    },
    computed : {
        ...mapWritableState(useUserStore, ['showModal'])
    }

}
</script>

<template>
    <div class="container px-6 py-12 h-full">
    <div class="flex justify-center flex-wrap h-full g-6 text-gray-800">
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20 mt-10">
            <div class="flex justify-center mb-8 font-bold mt-10">Change Password</div>
            <form>
                <div class="flex flex-col gap-6 ">
                    <div class="relative">
                        <input v-model="password" type="text" id="oldPassword" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label for="oldPassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75        top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0        peer-focus:scale-75 peer-focus:-translate-y-4">Old password</label>
                    </div>
                    <div class="relative">
                        <input v-model="newPassword" type="text" id="newPassword" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label for="newPassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75        top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0        peer-focus:scale-75 peer-focus:-translate-y-4">New Password</label>
                    </div>
                    <div class="relative">
                        <input v-model="confirmNewPassword" type="email" id="confirmPassword" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label for="confirmPassword" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75        top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0        peer-focus:scale-75 peer-focus:-translate-y-4">Confirm New Password</label>
                    </div>
                    <div class="flex justify-center place-items-center">
                        <button @click.prevent="showModal = true" for="my-modal" class="btn btn-outline">SUBMIT</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>

    <Modal v-if="showModal" :password="password" :newPassword="newPassword" :confirmNewPassword="confirmNewPassword" />
</template>