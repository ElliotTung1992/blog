<!-- vue3=对象类型的响应数据 -->
<template>
    <div class="car">
        <h2>汽车信息: 一台{{car.brand}}汽车, 价格是{{car.price}}万</h2>
        <h2>游戏列表:</h2>
        <ul>
            <li v-for="game in games" :key="game.id">{{ game.name }}</li>
        </ul>
        <h2>测试:{{ obj.a.b.c }}</h2>
        <button @click="changeCarPrice">修改汽车的价格</button>
        <button @click="changeFirstGame">修改排行第一的游戏</button>
        <button @click="test">测试</button>
        <button @click="changeCar">修改汽车</button>
    </div>
</template>

<script setup lang="ts">
    import {reactive} from 'vue'
    let car = reactive({brand:'奔驰S600', price: 120})
    let games = reactive([{id:1, name: '王者荣耀'},
                {id:2, name: 'LOL'},
                {id:3, name: '穿越火线'},])
    let obj = reactive({a:{
                    b:{
                        c: "haha"
                    }
                }})

    function changeCarPrice(){
        console.info(car)
        car.price += 10;
    }
    function changeFirstGame(){
        games[0].name = '仙剑奇侠传'
    }
    function test(){
        obj.a.b.c = 'hehe'
    }
    function changeCar(){
        Object.assign(car, {brand:'Tesla',price:30})
    }
</script>

<style scoped>
    .car{
        background-color: skyblue;
        box-shadow: 0px 0px 10px;
        border-radius: 10px;
        padding: 20px
    }
    button{
        margin: 10px;
    }
</style>