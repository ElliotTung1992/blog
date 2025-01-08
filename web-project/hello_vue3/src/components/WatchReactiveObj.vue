<template>
    <div class="person">
        <h1>情况三: 监听Reactive定义的对象类型数据</h1>
        <h2>姓名:{{ person.name }}</h2>
        <h2>年龄:{{ person.age }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="changePerson">修改整个人</button>
        <hr>
        <h2>测试:{{ obj.a.b.c }}</h2>
        <button @click="changeObj">修改测试数据</button>
    </div>
</template>

<script setup lang="ts">
    import {reactive,watch} from 'vue'
    let person = reactive({
        name: 'zhangsan',
        age: 18
    })
    let obj = reactive({a:{
        b:{
            c:111
        }
    }})
    function changeName(){
        person.name += '~'
    }
    function changeAge(){
        person.age += 1
    }
    function changePerson(){
        Object.assign(person, {
            name:'lisi',
            age:20
        })
    }
    function changeObj(){
        obj.a.b.c = 222
    }
    watch(person,(newValue,oldValue)=>{
        console.info("person发生变化了",newValue,oldValue)
    },{deep:false})
    watch(obj,(newValue,oldValue)=>{
        console.info("obj发生变化了",newValue,oldValue)
    })
</script>

<style>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>