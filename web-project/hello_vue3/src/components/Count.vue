<template>
    <div class="count">
        <h2>当前求和为:{{ sum }}</h2>
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
    import { ref } from "vue";

    let sum = ref(0)
    let n = ref(1)

    function add(){
        sum.value += n.value
    }
    function reduce(){
        sum.value -= n.value
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






