<template>
    <div class="watchref">
        <h1>情况一: 监听Ref定义的基本数据类型</h1>
        <h2>当前求和为: {{ sum }}</h2>
        <button @click="addSum">点我sum+1</button>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from 'vue'
    let sum = ref(0)
    function addSum(){
        sum.value += 1
    }
    const stopWatch = watch(sum, (newValue, oldValue)=>{
        console.info('sum变化了',newValue, oldValue)
        if(newValue >= 10){
            stopWatch()
        }
    })
</script>

<style>
    .watchref{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>