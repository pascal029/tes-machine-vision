<script>
import Card from '../components/Card.vue';
import { usePostsStore } from '../stores/posts';
import { mapWritableState, mapActions } from 'pinia';
export default {
    components : {
        Card
    },
    computed : {
        ...mapWritableState(usePostsStore, ['posts', 'page', 'limit', 'posts'])
    },
    async created(){
        await this.renderHome({page : this.page, limit : this.limit})
    },
    methods : {
        ...mapActions(usePostsStore, ['renderHome'])
    }
}
</script>

<template>
    <div class="px-16 py-10 h-screen w-f    ull flex flex-col justify-between">
        <form>   
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="search" class="md:w-auto sm:w-full lg:w-80 font-sm block w-80 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by tag & caption (single tag)" required>
            </div>
        </form>
        <div class="flex flex-wrap ">
            <p v-if="posts.length < 1"> no data available</p>
            <Card v-for="post in posts" :key="post.id" :post="post"/>
        </div>

        <div class="flex justify-center"><div class="btn-group">
            <button class="btn" v-if="page > 1">«</button>
            <button class="btn">{{this.page}}</button>
            <button class="btn">»</button>
        </div></div>
        
    </div>
    
</template>