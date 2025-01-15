<template>
    <h2>About</h2>
</template>

<script setup lang="ts">
    import {onMounted,onUnmounted} from 'vue'

    onMounted(()=>{
        console.info('About组建挂载了')
    })
    onUnmounted(()=>{
        console.info('About组建卸载了')
    })
</script>

<style>

</style>