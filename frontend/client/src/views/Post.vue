<script>
import Card from '../components/Card.vue';
import ModalPost from '../components/ModalPost.vue';
import {usePostsStore} from '../stores/posts'
import { mapWritableState } from 'pinia';
export default {
    components : {
        Card,
        ModalPost
    },
    computed : {
        ...mapWritableState(usePostsStore, ['showModal'])
    },
    methods :{
        trigerredModal(){
            this.showModal = true
        }
    }
}
</script>

<template>
    <div class="px-16 py-10 h-full w-full flex flex-col justify-between">
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
            <Card /><Card /><Card /><Card />
        </div>
        <div class="flex justify-center justify-between">
            <div></div>
            <div class="flex ">
                <div class="btn-group">
                    <button class="btn">«</button>
                    <button class="btn">Page 22</button>
                    <button class="btn">»</button>
                </div>
            </div>
            <div >
                <img @click.prevent="trigerredModal" src="../assets/png-transparent-number-computer-icons-plus-miscellaneous-game-plus.png" style="height :50px;width:50px">
            </div>
        </div>
        <ModalPost v-if="showModal"/>
    </div>
    
</template>