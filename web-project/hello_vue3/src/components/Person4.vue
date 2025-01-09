<template>
    <div class="person">
        
    </div>
</template>

<script setup lang="ts">
    import {type PersonInterface, type Persons} from '@/types'

    let person:PersonInterface = {id:'dasdasdnsah1', name:'zhangsan', age:18}

    let personList:Persons = [
        {id:'dasdasdnsah1', name:'zhangsan', age:18},
        {id:'dasdasdnsah2', name:'lisi', age:60},
        {id:'dasdasdnsah3', name:'wangwu', age:5}
    ]
</script>

<style>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>