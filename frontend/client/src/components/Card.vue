<script>
import { mapActions ,mapWritableState} from 'pinia';
import Modal from '../components/Modal.vue';

import { useUserStore } from '../stores/user';
export default {
  components : {
    Modal
  },
  props : ['post'],
  data () {
    return {
      postUrl : false
    }
  },
  computed : {
    ...mapWritableState(useUserStore, ['showModal'])
  },
  created (){
    if(this.$route.path == '/post'){
      this.postUrl = true
    }
  },
  methods : {
    showDelete(){
      console.log('ketriger')
      this.showModal = true
    }
  }
}

</script>

<template>
    <div class="card w-64 bg-base-100 shadow-xl mx-2 my-2">
  <figure><img :src="post.image" alt="Shoes" /></figure>
  <div class="card-body">

    <div class="flex justify-end w-full">
      <p class="font-bold">{{ post.user.username }}</p>
      <button class="btn btn-primary btn-sm" v-if="postUrl">Edit</button>
    </div>
    <div class="flex justify-end">

      <p>{{ post.caption }}</p>
      
      <button class="btn btn-primary btn-sm" v-if="postUrl" @click.prevent="showDelete">Delete</button>
    </div>
    <p class="text-blue-600">{{ post.tags }}</p>
  </div>
</div>
<Modal v-if="showModal"/>
</template>