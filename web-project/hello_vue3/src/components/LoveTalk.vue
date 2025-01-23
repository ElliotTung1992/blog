<template>
    <div class="talk">
        <button>获取一句土味情话</button>
    </div>
    <ul>
        <li v-for="talk in talkList" :key="talk.id">{{ talk.title }}</li>
    </ul>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';

    let talkList = reactive([
        {id:'dsads1', title: "哈哈"},
        {id:'dsads2', title: "呵呵"},
        {id:'dsads3', title: "嘻嘻"}
    ])
</script>

<style>
    .talk{
        background-color: orange;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>