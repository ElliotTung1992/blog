<template>
    <div class="person">
        <h1>情况四: 监听Reactive定义的对象类型数据的某个属性</h1>
        <h2>姓名:{{ person.name }}</h2>
        <h2>年龄:{{ person.age }}</h2>
        <h2>汽车: {{ person.car.c1 }} - {{ person.car.c2 }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="changeC1">修改第一台车</button>
        <button @click="changeC2">修改第二台车</button>
        <button @click="changeCar">修改所有车</button>
    </div>
</template>

<script setup lang="ts">
    import {reactive,watch} from 'vue'
    let person = reactive({
        name:'zhangsan',
        age:18,
        car:{
            c1:'奔驰',
            c2:'宝马'
        }
    })
    function changeName(){
        person.name += '~'
    }
    function changeAge(){
        person.age += 1
    }
    function changeC1(){
        person.car.c1 = '奥迪'
    }
    function changeC2(){
        person.car.c2 = '大众'
    }
    function changeCar(){
        person.car = {
            c1:'雅迪',
            c2:'爱玛'
        }
    }
    watch(()=>person.name,(newValue,oldValue)=>{
        console.info("person发生了变化",newValue,oldValue)
    })
    watch(()=>person.car,(newValue,oldValue)=>{
        console.info("person发生了变化",newValue,oldValue)
    },{deep:true})
</script>

<style>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>