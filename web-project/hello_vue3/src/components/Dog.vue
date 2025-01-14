<template>
    <div class="person">
        <h2>{{ num }}</h2>
        <button @click="sumUp">点我加1</button>
        <hr>
        <img v-for="(dog,index) in dogList" :src="dog" :key="index"><br>
        <button @click="getPic">点我加张图片</button>
    </div>
</template>

<script setup lang="ts">
    import {ref,reactive} from 'vue'
    import axios from 'axios'

    let num = ref(0)
    let dogList = reactive(['https://images.dog.ceo/breeds/pembroke/n02113023_5006.jpg'])
    function sumUp(){
        num.value += 1
    }
    async function getPic(){
        try {
            let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
            dogList.push(result.data.message)
        } catch (error) {
            alert(error)
        }
    }
</script>

<style scoped>
    .person{
        background-color: skyblue;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px;
    }
    button{
        margin: 0 5px;
    }
    img{
        height: 100px;
        margin-right: 10px;
    }
</style>