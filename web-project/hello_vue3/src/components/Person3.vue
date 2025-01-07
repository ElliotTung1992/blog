<template>
    <div class="person">
        姓:<input type="text" v-model="firstName"><br>
        名:<input type="text" v-model="lastName"><br>
        全名: <span>{{ fullName }}</span><br>
        全名: <span>{{ fullName }}</span><br>
        全名: <span>{{ fullName }}</span><br>
        全名: <span>{{ fullName }}</span><br>
        全名: <span>{{ fullName }}</span><br>
        <button @click="changeFullname">修改fullName为li-si</button>
    </div>
</template>

<script setup lang="ts">
    import {computed, ref} from 'vue'
    let firstName = ref('zhang')
    let lastName = ref('san')
    let fullName = computed({
        get(){
            return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
        },
        set(val){
            firstName.value = val.split('-')[0]
            lastName.value = val.split('-')[1]
        }
    })
    function getFullName(){
        console.info(1)
        return firstName.value.slice(0,1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
    }
    function changeFullname(){
        fullName.value = 'li-si'
    }
</script>

<style>
    .person{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 10px;
    }
</style>