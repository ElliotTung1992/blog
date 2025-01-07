<template>
    <div class="app">
        <h1>你好啊!</h1>
        <Person3/>
    </div>
</template>

<script lang="ts">
    import Person from './components/Person.vue'
    import Person2 from './components/Person2.vue'
    import Person3 from './components/Person3.vue'
    import Car from './components/Car.vue'
    import Car2 from './components/Car2.vue'

    export default {
        name: 'App',
        components:{Person, Person2, Person3, Car, Car2}
    }
</script>

<style>
    .app {
        background-color: #ddd;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px;
    }
</style>