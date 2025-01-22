<template>
    <Count/>
</template>

<script setup lang="ts" name="App">
    import Count from './components/Count.vue';
</script>











<!-- <template>
    <div class="app">
        <Heand/>
        <div class="navigate">
            <RouterLink replace to="/home" active-class="active">首页</RouterLink>
            <RouterLink replace :to="{name:'xinwen'}" active-class="active">新闻</RouterLink>
            <RouterLink :to="{path:'/about'}" active-class="active">关于</RouterLink>
        </div>
        <div class="main-content">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts" name="App">
    import { RouterView,RouterLink } from 'vue-router'
    import Heand from './components/Head.vue'
</script>

<style>
    a{
        margin-right: 10px;
    }
    .navigate .active{
        color: red;
    }
</style> -->