<script>
import { usePostsStore } from '../stores/posts';
import { mapWritableState, mapActions } from 'pinia';
export default{
  data(){
    return {
      processing : '',
      File : null,
      caption : '',
      tags : '',
      image : ''
    }
  },
  methods : {
    ...mapActions(usePostsStore, ['editPost']),
    handleImage(e){
      this.File = e.target.files[0];
      this.submitFile()
    },
    async submitFile() {
      this.processing = 'trigerred'
      const storage = await firebase.storage().ref().child(`${this.File.name}`);
      const storageRef = await storage.put(this.File);
        
      storage.getDownloadURL().then((res) => {
        this.image = res
        this.processing = false
      });
    },
    closeModal(){
      this.showModalPosts = false
    },
    async submitData(){
      const data = {
        id : this.postId,
        image : this.image,
        tags : this.tags,
        caption : this.caption
      }
      await this.editPost(data)
      this.showModalPosts = false
    }
  },
  computed : {
    ...mapWritableState(usePostsStore, ['post', 'showModalPosts', 'clickedFrom', 'postId'])
  },
  async created(){
    if(this.clickedFrom == 'edit'){
      this.caption = this.post.caption,
      this.image = this.post.image,
      this.tags = this.post.tags
      console.log(this.caption, this.image, this.tags)
    }
  }
}
</script>

<template>
    <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-sm">
        <!--content-->
      <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

          <!--body-->
          <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">{{ this.clickedFrom }} post</h3>
                <form class="space-y-6" >
                    <div>
                        <input name="image" id="image" @change="handleImage" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" accept=".jpg,.jpeg,.png">
                        <img v-if="this.image" :src="image"/>
                    </div>
                    
                    <div>
                        <input v-model="this.caption" type="text" placeholder="caption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    <div>
                        <input v-model="this.tags" type="text" placeholder="tags (#senja #surabaya)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                    </div>
                    
                </form>
            </div>
          <!--footer-->
          <div class="flex gap-6 items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
            <button @click.prevent="closeModal" class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              Close
            </button>
            <button @click.prevent="submitData" class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
</template>