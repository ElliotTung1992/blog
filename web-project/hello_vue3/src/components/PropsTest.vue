<template>
    <div class="person">
        <ul>
            <li v-for="p in list" key="p.id">
                {{ p.name }} -- {{ p.age }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import {type Persons} from '@/types'
    
    //let x = defineProps(['list'])
    //defineProps<{list?:Persons}>()
    withDefaults(defineProps<{list?:Persons}>(), {
        list:()=> [{id:'dsad1', name:'Elliot', age:10}]
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