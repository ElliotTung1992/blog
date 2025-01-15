
// 创建一个路由器并暴露出去
import { createRouter,createWebHashHistory,createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import News from '@/pages/News.vue'
import About from '@/pages/About.vue'
import NewsDetail from '@/pages/NewsDetail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            name:'zhxuye',
            path:'/home',
            component: Home
        },
        {
            name:'xinwen',
            path:'/news',
            component: News,
            children:[
                {
                    path:'newsDetail',
                    component: NewsDetail
                }
            ]
        },
        {
            name:'guanyu',
            path:'/about',
            component: About
        }
    ]
})
export default router