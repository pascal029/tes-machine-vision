<script>
import { mapActions ,mapWritableState} from 'pinia';
import Modal from '../components/Modal.vue';

import { useUserStore } from '../stores/user';
import { usePostsStore } from '../stores/posts';
export default {
  components : {
    Modal
  },
  props : ['post'],
  data () {
    return {
      postUrl : false,
      id : 0,
    }
  },
  computed : {
    ...mapWritableState(useUserStore, ['showModal']),
    ...mapWritableState(usePostsStore, ['postId', 'showModalPosts', 'clickedFrom'])
  },
  created (){
    if(this.$route.path == '/post'){
      this.postUrl = true
    }
    this.id = this.post.id
  },
  methods : {
    ...mapActions(usePostsStore, ['getPost']),
    showDelete(){
      this.showModal = true
      this.postId = this.id
    },
    async showEdit(){
      this.postId = this.id
      await this.getPost(this.id)
      this.clickedFrom = 'edit'
      this.showModalPosts = true
    }
  }
}

</script>

<template>
    <div class="card w-64 bg-base-100 shadow-xl mx-2 my-2">
  <figure><img :src="post.image" alt="Shoes" style="height:150px;width=150px" /></figure>
  <div class="card-body">
    <p class="font-bole">{{ post.likes }} likes</p>
    <div class="flex justify-end w-full">
      
      <p class="font-bold">{{ post.user.username }}</p>
      <button class="btn btn-primary btn-sm" v-if="postUrl" @click.prevent="showEdit">Edit</button>
    </div>
    <div class="flex justify-end">

      <p>{{ post.caption }}</p>
      
      <button class="btn btn-primary btn-sm" v-if="postUrl" @click.prevent="showDelete">Delete</button>
    </div>
    <p class="text-blue-600">{{ post.tags }}</p>
  </div>
</div>
<Modal v-if="showModalPosts" />
</template>