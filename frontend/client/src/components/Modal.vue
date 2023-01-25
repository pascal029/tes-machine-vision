<script>
    import { useUserStore } from '../stores/user'
    import { usePostsStore } from '../stores/posts'
    import { mapWritableState, mapActions } from 'pinia'
    export default {
      data(){
        return {
          route : ''
        }
      },
      async created(){
        if(this.$route.path == '/post') this.route = 'post'
      },
        props : ['password', 'confirmNewPassword', 'newPassword'],
        methods : {
            ...mapActions(useUserStore, ['updateUser', 'updatePassword']),
            ...mapActions(usePostsStore, ['deletePost', 'renderPost']),
            closeModal(){
                this.showModal = false
            },
            async submitData(){
                if(this.$route.path == '/user'){
                  await this.updateUser(this.user)
                } else if( this.$route.path == '/change-password'){
                  const passwordData = {oldPassword : this.password, newPassword : this.newPassword, confirmNewPassword : this.confirmNewPassword}
                  await this.updatePassword(passwordData)
                } else if(this.$route.path == '/post'){
                  await this.deletePost({id : this.postId})
                  await this.renderPost({page : 1, limit : 8})
                }
                this.showModal = false
                this.disabled = 0
            }
        },
        computed : {
            ...mapWritableState(useUserStore, ['showModal', 'user', 'disabled']),
            ...mapWritableState(usePostsStore, ['postId'])
        },
    }

</script>

<template>
<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-slate-500 text-lg leading-relaxed">
                Are you sure you want to {{ this.route == 'post' ? 'delete' : 'update' }} this data ?
            </p>
          </div>
          <!--footer-->
          <div class="flex gap-6 items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click.prevent="closeModal">
              No
            </button>
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click.prevent="submitData()">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>