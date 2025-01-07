<!-- vue2的写法 -->
<template>
    <div class="person">
        <h2>姓名: {{ name }}</h2>
        <h2>年龄: {{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">年龄+1</button>
        <button @click="showTel">点我查看联系方式</button>
    </div>
</template>

<script lang="ts">
    export default {
        name:'Person',
        data(){
            return {
                name: '张三',
                age:18,
                tel:'13888888888'
            }
        },
        methods:{
            changeName(){
                this.name = 'zhangsan'
            },
            changeAge(){
                this.age += 1
            },
            showTel(){
                alert(this.tel)
            }
        }
    }
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