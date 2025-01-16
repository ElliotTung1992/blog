<template>
    <h2>News</h2>
    <!-- 导航区 -->
    <div>
        <ul>
            <li v-for="news in newsList" :key="news.id">
                <!-- <RouterLink :to="`/news/newsDetail?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->
                <!-- <RouterLink 
                    :to="{
                        path:'/news/newsDetail',
                        query:{
                            id: news.id,
                            title: news.title,
                            content: news.content
                        }
                    }">
                    {{ news.title }}
                </RouterLink> -->
                <!-- <RouterLink :to="`/news/newsDetail/${news.id}/${news.title}/${news.content}`">
                    {{ news.title }}
                </RouterLink> -->
                <button @click="showNewsDetail(news)">查看新闻</button>
                <RouterLink 
                    :to="{
                        name:'xinwenxiangqing',
                        query:{
                            id: news.id,
                            title: news.title,
                            content: news.content
                        }
                    }">
                    {{ news.title }}
                </RouterLink>
            </li>
        </ul>
    </div>
    <!-- 展示区 -->
    <div>
        <RouterView></RouterView>
    </div>
</template>

<script setup lang="ts" name="News">
    import { RouterView,RouterLink,useRouter } from 'vue-router'
    import { reactive } from "vue"

    const newsList = reactive([
        {id:'dsadsa01',title:'和好的抗癌食物',content:'西兰花'},
        {id:'dsadsa02',title:'如何一夜暴富',content:'学IT'},
        {id:'dsadsa03',title:'震惊,万万没想到',content:'明天是周一'},
        {id:'dsadsa04',title:'好消息,好消息',content:'快过年了'}
    ])

    const router = useRouter()

    interface NewsInter {
        id:string,
        title:string,
        content:string
    }

    function showNewsDetail(news:NewsInter){
        router.push({
                name:'xinwenxiangqing',
                query:{
                    id: news.id,
                    title: news.title,
                    content: news.content
                }
            })
    }
    
</script>

<style>

</style>