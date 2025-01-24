<template>
    <div class="count">
        <h2>当前求和为: {{sum}} </h2>
        <h3>地址为: {{ address }}</h3>
        <h3>超级求和: {{ bigSum }}, 大些的地址: {{ addressToUpperCase }}</h3>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add">加</button>
        <button @click="reduce">减</button>
    </div>
</template>

<script setup lang="ts" name="Count">
    import { ref,reactive,toRefs } from "vue";
    import {useCountStore} from '@/store/count'
    import { storeToRefs } from 'pinia'

    let n = ref(1)
    let obj = reactive({
        a: 1,
        b: 2,
        c: ref(3)
    })
    const countStore = useCountStore()
    const {sum,address,bigSum,addressToUpperCase} = storeToRefs(countStore)

    // console.info(toRefs(countStore))
    // console.info(storeToRefs(countStore))

    function add(){
        // 这是第一种方式
        // countStore.sum += 1
        // countStore.address = '上海'

        // 第二种方式
        // countStore.$patch({
        //     sum: 8,
        //     address: '北京'
        // })
    
        // 第三种方式
        countStore.increment(n.value)    
    }
    function reduce(){
        countStore.sum -= n.value
    }
</script>

<style scoped>
    .count{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
    select,button {
        margin: 0 5px;
        height: 25px;
    }
</style>






