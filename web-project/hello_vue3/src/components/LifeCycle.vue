<!-- vue2的写法 -->
<template>
    <div class="person">
        <h2>{{ num }}</h2>
        <button @click="add">点我加1</button>
    </div>
</template>

<script lang="ts">
    export default {
        name:'Person',
        data(){
            return {
                num: 9
            }
        },
        methods:{
            add (){
                this.num += 1
            }
        },
        beforeCreate(){
            console.log('beforeCreate')
        },
        created(){
            console.log('created')
        },
        beforeMount(){
            console.log('beforeMount')
        },
        mounted(){
            console.log('mounted')
        },
        beforeUpdate(){
            console.log('beforeUpdate')
        },
        updated(){
            console.log('updated')
        },
        beforeDestroy(){
            console.log('beforeDestroy')
        },
        destroyed(){
            console.log('destroyed')
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