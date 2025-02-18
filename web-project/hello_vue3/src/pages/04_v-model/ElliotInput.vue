<template>
    <input type="text" :value="xingming" @input="emit('update:xingming', (<HTMLInputElement>$event.target).value)">
    <input type="text" :value="mima" @input="emit('update:mima', (<HTMLInputElement>$event.target).value)">
</template>

<script setup lang="ts" name="ElliotInput">
    defineProps(['xingming','mima'])
    const emit = defineEmits(['update:xingming','update:mima'])
</script>

<style>
    input {
        height: 50px;
    }
</style>