<template>
    <ul>
        <!-- <li>编号:{{ query.id }}</li>
        <li>标题:{{ query.title }}</li>
        <li>内容:{{ query.content }}</li> -->
        <li>编号:{{ id }}</li>
        <li>标题:{{ title }}</li>
        <li>内容:{{ content }}</li>
    </ul>
</template>

<script setup lang="ts">
    // import { toRefs } from 'vue'
    // import { useRoute } from 'vue-router'
    // let route = useRoute()
    // let {query} = toRefs(route)
    // console.info(route)

    // import { useRoute } from 'vue-router';
    // const route = useRoute()
    // console.info(route)

    defineProps(['id','title','content'])
</script>

<style>

</style>