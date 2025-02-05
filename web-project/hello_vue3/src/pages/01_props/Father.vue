<template>
  <div class="father">
    <h3>父组件</h3>
	<h4>我的车: {{ car }}</h4>
	<h4 v-if="toy">儿子给我的玩具: {{ toy }}</h4>
	<Child :car="car" :sendToy="getToyFromChild"/>
  </div>
</template>

<script setup lang="ts" name="Father">
	import Child from './Child.vue';
	import {ref} from 'vue'

	let car = ref("奔驰")
	let toy = ref()
	function getToyFromChild(value:string){
		toy.value = value
	}

</script>

<style scoped>
	.father{
		background-color:rgb(165, 164, 164);
		padding: 20px;
		border-radius: 10px;
	}
</style>