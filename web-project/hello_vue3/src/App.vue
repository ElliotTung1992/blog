<template>
    <div class="app">
        <Dog/>
    </div>
</template>

<script lang="ts" setup name="App">
    import Person from './components/Person.vue'
    import Person2 from './components/Person2.vue'
    import Person3 from './components/Person3.vue'
    import Person4 from './components/Person4.vue'
    import Person5 from './components/Person5.vue'
    import Car from './components/Car.vue'
    import Car2 from './components/Car2.vue'
    import WatchRef from './components/WatchRef.vue'
    import WatchRefObj from './components/WatchRefObj.vue'
    import WatchReactiveObj from './components/WatchReactiveObj.vue'
    import WatchObjParam from './components/WatchObjParam.vue'
    import WatchObjMultiParam from './components/WatchObjMultiParam.vue'
    import WatchEffect from './components/WatchEffect.vue'
    import Ref from './components/Ref.vue'
    import PropsTest from './components/PropsTest.vue'
    import LifeCycle from './components/LifeCycle.vue'
    import LifeCycleVue3 from './components/LifeCycleVue3.vue'
    import Dog from './components/Dog.vue'
    
    import {reactive, ref} from 'vue'
    import {type Persons} from '@/types'

    let isShow = ref(true)

</script> 

<!-- <script lang="ts">

    import LifeCycle from './components/LifeCycle.vue';

    export default {
        name:'App',
        components:{LifeCycle},
        data(){
            return {
                isShow: true
            }
        }
    }
</script> -->

<style>
    .app {
        background-color: #ddd;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px;
    }
</style>