<script>
import Card from '../components/Card.vue';
import ModalPost from '../components/ModalPost.vue';
import {usePostsStore} from '../stores/posts'
import { mapWritableState, mapActions } from 'pinia';
export default {
    data(){
        return{
            search : '',
            searchBy : ''
        }
    },
    components : {
        Card,
        ModalPost,
    },
    computed : {
        ...mapWritableState(usePostsStore, ['showModalPosts', 'posts', 'clickedFrom', 'pagination']),
    },
    methods :{
        ...mapActions(usePostsStore, ['renderPost']),
        trigerredModal(){
            this.clickedFrom = 'create'
            this.showModalPosts = true
        },
        async paginationPlus(){
            this.pagination.page += 1
            const value = {
                search : this.search || '',
                searchBy : this.searchBy || '',
                page : this.pagination.page,
                limit : this.pagination.limit
            }
            await this.renderPost(value)
        },
        async paginationMin(){
            this.pagination.page -= 1
            const value = {
                search : this.search || '',
                searchBy : this.searchBy || '',
                page : this.pagination.page,
                limit : this.pagination.limit
            }
            await this.renderPost(value)
        },
        async searchFunction(dataSearch){
            if(dataSearch[0] == '#'){
                this.searchBy = 'tags'
            } else {
                this.searchBy = 'caption'
            }
            let value = {
                page : 1,
                limit : this.pagination.limit,
                search : this.search,
                searchBy : this.searchBy
            }
            await this.renderPost(value)
        }
    },
    async created (){
        await this.renderPost({page : 1, limit : 8})
    }
}
</script>

<template>
    <div class="px-16 py-10 h-full w-full flex flex-col justify-between">
        <form @submit.prevent="searchFunction(search)">   
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input v-model="search" type="search" id="search" class="md:w-auto sm:w-full lg:w-80 font-sm block w-80 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by tag & caption (single tag)">
            </div>
        </form>
        <div class="flex flex-wrap ">
            <p v-if="posts.length < 1"> no data available</p>
            <Card v-for="(post, idx) in posts" :key="idx" :post="post"/>
        </div>
        <div class="flex justify-center justify-between">
            <div></div>
            <div class="flex ">
                <div class="flex justify-center"><div class="btn-group">
                    <button @click.prevent="paginationMin" class="btn" v-if="pagination.page > 1">«</button>
                    <button class="btn">{{this.pagination.page}}</button>
                    <button @click.prevent="paginationPlus" class="btn" v-if="pagination.total - (pagination.page * 8) > 0">»</button>
                </div>
            </div>
            </div>
            <div >
                <img @click.prevent="trigerredModal" src="../assets/png-transparent-number-computer-icons-plus-miscellaneous-game-plus.png" style="height :50px;width:50px">
            </div>
        </div>
        <ModalPost  v-if="showModalPosts"/>
    </div>
    
</template>