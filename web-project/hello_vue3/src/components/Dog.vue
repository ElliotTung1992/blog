<template>
    <div class="person">
        <h2>{{ num }},放大十倍之后:{{ bigNum }}</h2>
        <button @click="sumUp">点我加1</button>
        <hr>
        <img v-for="(dog,index) in dogList" :src="dog" :key="index"><br>
        <button @click="getPic">点我加张图片</button>
    </div>
</template>

<script setup lang="ts">
    import useSum from '@/hooks/useSum.ts'
    import useDog from '@/hooks/useDog.ts'

    const {num,bigNum,sumUp} = useSum()
    const {dogList,getPic} = useDog()

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