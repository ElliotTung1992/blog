<template>
    <div class="app">
        <Heand/>
        <!-- 导航区 -->
        <div class="navigate">
            <RouterLink to="/home" active-class="active">首页</RouterLink>
            <RouterLink :to="{name:'xinwen'}" active-class="active">新闻</RouterLink>
            <RouterLink :to="{path:'/about'}" active-class="active">关于</RouterLink>
        </div>
        <!-- 展示区 -->
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
</style>