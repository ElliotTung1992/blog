<template>
    <div class="talk">
        <button @click="getLoveTalk">获取一句土味情话</button>
    </div>
    <ul>
        <li v-for="talk in talkStore.talkList" :key="talk.id">{{ talk.title }}</li>
    </ul>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import axios from 'axios'
    import {nanoid} from 'nanoid'
    import {useTalkStore} from '@/store/loveTalk'

    const talkStore = useTalkStore()

    talkStore.$subscribe((mutate, state)=> {
        console.log('talkStore里面的数据发生变化了',mutate, state)
        localStorage.setItem('talkList', JSON.stringify(state.talkList))
    })

    function getLoveTalk(){
        talkStore.getATalk()
    }
</script>

<style>
    .talk{
        background-color: orange;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>