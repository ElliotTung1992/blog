<!-- vue2的写法 -->
<template>
    <div class="person">
        <h2>{{ num }}</h2>
        <button @click="add">点我加1</button>
    </div>
</template>

<script lang="ts" setup>
    import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'

    let num = ref(0)

    function add(){
        num.value += 1
    }
    console.info('beforeCreate and created')
    onBeforeMount(()=>{
        console.log('onBeforeMount')
    }),
    onMounted(()=>{
        console.log('onMounted')
    }),
    onBeforeUpdate(()=>{
        console.log('onBeforeUpdate')
    }),
    onUpdated(()=>{
        console.log('onUpdated')
    }),
    onBeforeUnmount(()=>{
        console.log('onBeforeUnmount')
    }),
    onUnmounted(() => {
      console.log('Component has been unmounted');
    });
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
</style>