<!-- vue3的写法=基本数据类型的响应式数据 -->
<template>
    <div class="person">
        <h2>姓名:{{ name }}</h2>
        <h2>年龄:{{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">年龄+1</button>
        <button @click="showTel">查看我的联系方式</button>

        <h2>性别:{{ person.gender }}</h2>
        <h2>地址:{{ person.address }}</h2>
        <button @click="changeGender">修改性别</button>
    </div>
</template>

<script setup lang="ts" name="Person3">

    import {ref, reactive, toRefs} from 'vue'

    let name = ref('张三')
    let age = ref(19)
    let tel = '13888888888'

    let person = reactive({gender:'男', address:'宁波'})
    let {gender, address} = toRefs(person)

    function changeName(){
        name.value = 'zhangsan'
        console.info(name)
    }
    function changeAge(){
        age.value += 1
        console.info(age)
    }
    function showTel(){
        alert(tel)
    }
    function changeGender(){
        console.info(gender)
        gender.value = '女'
    }
</script>

<style scoped>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
    }
    button{
        margin: 5px;
    }
</style>