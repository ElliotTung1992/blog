<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>{{ username }}</h4>
    <h4>{{ password }}</h4>
    <!-- v-model用在html标签 -->
    <!-- <input type="text" v-model="username"> -->
    <!-- <input type="text" :value="username" @input="username = (<HTMLInputElement>$event.target).value"> -->

    <!-- v-model用在组件标签上 -->
    <ElliotInput v-model:xingming="username" v-model:mima="password"></ElliotInput>
    <!-- <ElliotInput :modelValue="username" @update:modelValue="username = $event"/> -->
  </div>
</template>

<script setup lang="ts" name="Father">
  import { ref } from 'vue'
  import ElliotInput from './ElliotInput.vue'

  let username = ref('zhangsan')
  let password = ref('123456')
</script>

<style scoped>
.father {
  padding: 20px;
  background-color: rgb(165, 164, 164);
  border-radius: 10px;
}
</style>
