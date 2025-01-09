<template>
    <div class="person">
        <h1>中国</h1>
        <h2 ref="title2">北京</h2>
        <h3>尚硅谷</h3>
        <button @click="showH2">点击我展示h2这个元素</button>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue'

    let title2 = ref()
    let a = ref(0)
    let b = ref(1)
    let c = ref(2)

    function showH2(){
        console.log(title2.value)
    }

    defineExpose({a,b,c})
</script>

<style scoped>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>