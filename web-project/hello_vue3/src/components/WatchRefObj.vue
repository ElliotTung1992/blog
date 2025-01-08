<template>
    <div class="person">
        <h1>情况二: 监听Ref定义的对象类型数据</h1>
        <h2>姓名:{{ person.name }}</h2>
        <h2>年龄:{{ person.age }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="changePerson">修改整个人</button>
    </div>
</template>

<script setup lang="ts">
    import {ref,watch} from 'vue'
    let person = ref({
        name:'zhangsan',
        age:18
    })
    function changeName(){
        person.value.name += '~'
    }
    function changeAge(){
        person.value.age += 1
    }
    function changePerson(){
        person.value = {
            name:'lisi',
            age:20
        }
    }
    watch(person, (newValue,oldValue)=>{
        console.log('person数据变了', newValue,oldValue)
    },{deep:true, immediate:true})
</script>

<style>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>