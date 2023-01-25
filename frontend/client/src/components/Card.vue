<script>
export default {
  props : ['post']
}

</script>

<template>
    <div class="card w-64 bg-base-100 shadow-xl mx-2 my-2">
  <figure><img :src="post.image" alt="Shoes" /></figure>
  <div class="card-body">

    <p class="font-bold">{{ post.user.username }}</p>
    <p>{{ post.caption }}</p>
    <p class="text-blue-600">{{ post.tags }}</p>
  </div>
</div>
</template>