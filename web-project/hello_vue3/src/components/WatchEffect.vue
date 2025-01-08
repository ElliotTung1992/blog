<template>
    <div class="person">
        <h1>水温达到50摄氏度, 或水位超过40cm, 则进行警报</h1>
        <h2>水温:{{ temp }}</h2>
        <h2>水位:{{ hight }}</h2>
        <button @click="addTemp">增加水温+10</button>
        <button @click="addHight">增加水位+10</button>
    </div>
</template>

<script setup lang="ts">
    import {h, ref,watch,watchEffect} from 'vue'
    let temp = ref(0)
    let hight = ref(0)
    function addTemp(){
        temp.value += 10
    }
    function addHight(){
        hight.value += 10
    }
    watch([temp, hight], (newValue)=>{
        const [newTemp, newHight] = newValue
        if(newTemp >= 50 || newHight > 40){
            console.info('开始警报')
        }
    })
    // watchEffect(()=> {
    //     if(temp.value >= 50 || hight.value > 40){
    //         console.info('开始警报')
    //     }
    // })
</script>

<style>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>